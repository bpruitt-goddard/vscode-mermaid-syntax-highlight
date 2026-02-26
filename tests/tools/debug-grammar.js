#!/usr/bin/env node
// tests/tools/debug-grammar.js
// Debug a single line against the compiled grammar to see what scopes are matched.
// Usage:
//   echo "Rel(customer, ..." | node tests/tools/debug-grammar.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..', '..');

const [, , ...args] = process.argv.slice(2);

let line = args.join(' ');

if (!line) {
  const stdin = fs.readFileSync(0, 'utf8').trim();
  if (stdin) {
    line = stdin.split('\n')[0];
  }
}

if (!line) {
  console.error('Usage: echo "<line>" | node tests/tools/debug-grammar.js');
  process.exit(2);
}

const grammarPath = path.join(ROOT_DIR, 'out', 'mermaid.tmLanguage.json');

console.log(`\n=== Grammar Debug Tool ===`);
console.log(`Line: "${line}"\n`);

const grammar = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));

function collectPatterns(obj, patterns = []) {
  if (!obj || typeof obj !== 'object') return patterns;
  if (Array.isArray(obj)) {
    for (const item of obj) collectPatterns(item, patterns);
    return patterns;
  }
  if (obj.match)
    patterns.push({
      pattern: obj.match,
      captures: obj.captures,
      comment: obj.comment,
    });
  if (obj.begin)
    patterns.push({
      pattern: obj.begin,
      captures: obj.beginCaptures,
      comment: obj.comment,
    });
  if (obj.patterns) collectPatterns(obj.patterns, patterns);
  if (obj.repository) {
    for (const v of Object.values(obj.repository)) {
      if (v && typeof v === 'object') collectPatterns(v, patterns);
    }
  }
  return patterns;
}

function createRegex(pattern) {
  // Extract inline modifiers like (?i) and convert to flags
  let flags = '';
  let cleanPattern = pattern;

  // Handle (?i) - case insensitive
  if (/^\(\?i\)/.test(pattern)) {
    flags += 'i';
    cleanPattern = cleanPattern.replace(/^\(\?i\)/, '');
  }

  // Handle (?m) - multiline
  if (/^\(\?m\)/.test(pattern)) {
    flags += 'm';
    cleanPattern = cleanPattern.replace(/^\(\?m\)/, '');
  }

  // Handle (?s) - dotall
  if (/^\(\?s\)/.test(pattern)) {
    flags += 's';
    cleanPattern = cleanPattern.replace(/^\(\?s\)/, '');
  }

  // Try with extracted flags
  try {
    return new RegExp(cleanPattern, flags);
  } catch (e) {
    console.log(`    RegExp error: ${e.message}`);
    return null;
  }
}

const allPatterns = collectPatterns(grammar);
const keyword = line
  .replace(/^\s+/, '')
  .split(/[\s,(]/)[0]
  .toLowerCase();

console.log(`Looking for patterns matching: "${keyword}"\n`);

const keywordPatterns = allPatterns.filter(
  (p) => p.pattern && p.pattern.toLowerCase().includes(keyword),
);

if (keywordPatterns.length === 0) {
  console.log(`No patterns found containing "${keyword}"`);
} else {
  console.log(`Found ${keywordPatterns.length} patterns:\n`);

  for (const p of keywordPatterns) {
    console.log(`--- Pattern ---`);
    console.log(`Regex: ${p.pattern.substring(0, 80)}...`);
    console.log(`Comment: ${p.comment || '(none)'}`);

    const regex = createRegex(p.pattern);
    if (!regex) {
      console.log(`STATUS: FAILS TO COMPILE - JSON escaping issue`);
    } else {
      const match = regex.exec(line.replace(/^\s+/, ''));
      if (match) {
        console.log(`MATCHED: "${match[0]}"`);
        if (p.captures && match.length > 1) {
          console.log('Captures:');
          for (let i = 1; i < match.length; i++) {
            if (match[i] !== undefined) {
              const name = p.captures[i]?.name || '(unnamed)';
              console.log(`  ${i}: "${match[i]}" -> ${name}`);
            }
          }
        }
      } else {
        console.log(`STATUS: Does not match test line`);
      }
    }
    console.log('');
  }
}

// Coverage map
const testLine = line.replace(/^\s+/, '');
const coverage = new Array(testLine.length).fill(null);

for (const p of keywordPatterns) {
  const regex = createRegex(p.pattern);
  if (!regex) continue;
  const match = regex.exec(testLine);
  if (match && p.captures) {
    for (let i = 1; i < match.length; i++) {
      if (match[i] !== undefined && p.captures[i]) {
        const start = match.index + match[0].indexOf(match[i]);
        for (let j = start; j < start + match[i].length; j++) {
          coverage[j] = p.captures[i].name;
        }
      }
    }
  }
}

console.log('=== Coverage Map ===');
console.log(`Line: ${testLine}`);
console.log(`Map:  ${coverage.map((c) => (c ? '✓' : '?')).join('')}`);
console.log('\nBy position:');
for (let i = 0; i < testLine.length; i++) {
  const c = testLine[i] === ' ' ? '_' : testLine[i];
  console.log(`  ${i}: '${c}' -> ${coverage[i] || '(unmatched)'}`);
}
