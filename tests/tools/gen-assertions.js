#!/usr/bin/env node
// tests/tools/gen-assertions.js
// Simple assertion generator for mermaid grammar tests.
// Usage:
// node tests/tools/gen-assertions.js "<line>" '{"start-end":"scope",...}'

const [line, spansJson] = process.argv.slice(2);
if (!line || !spansJson) {
  console.error(
    'Usage: node tests/tools/gen-assertions.js "<line>" "<spansJson>"',
  );
  console.error(
    'Example: node tests/tools/gen-assertions.js "Person(customer, "Customer", "A customer")" "{"1-6":"keyword.control.mermaid","7":"punctuation.parenthesis.open.mermaid"}"',
  );
  process.exit(2);
}

let spans;
try {
  spans = JSON.parse(spansJson);
} catch (e) {
  console.error('Invalid JSON for spans:', e.message);
  process.exit(2);
}

const prefix = '%% ';
const parsed = Object.keys(spans)
  .map((k) => {
    if (k.includes('-')) {
      const [s, e] = k.split('-').map(Number);
      return { start: s, end: e, scope: spans[k] };
    }
    const p = Number(k);
    return { start: p, end: p, scope: spans[k] };
  })
  .sort((a, b) => a.start - b.start);

console.log(line);
for (const span of parsed) {
  const len = Math.max(1, span.end - span.start + 1);
  if (span.start <= 3) {
    // Arrow/tilde style for tokens that begin at positions 1..3
    // Rules:
    //  - start==1: %% <-----
    //  - start==2: %%  <~-----  (one tilde)
    //  - start==3: %%   <~~----- (two tildes)
    const spacesBefore = ' '.repeat(Math.max(0, span.start - 1));
    const tildes = '~'.repeat(Math.max(0, span.start - 1));
    const dashes = '-'.repeat(len);
    console.log(
      prefix + spacesBefore + '<' + tildes + dashes + ' ' + span.scope,
    );
    continue;
  }

  // For caret-style assertions we need to account for the leading comment
  // prefix (`%% `). Tests in this repo expect the caret block to be shifted
  // two columns left relative to the naive calculation, so subtract 2.
  const caretIndent = Math.max(0, span.start - 4); // shift left
  const before = ' '.repeat(caretIndent);
  const carets = '^'.repeat(len);
  console.log(prefix + before + carets + ' ' + span.scope);
}
