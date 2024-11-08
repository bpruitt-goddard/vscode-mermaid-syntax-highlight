import fs from 'fs-extra';
import { GRAMMAR_SCHEMA } from './CustomYamlTypes.mjs';
import { read } from 'yaml-import';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_DIR = '../syntaxes/',
  DIR_OUT = '../out',
  INPUT_DIR = path.join(__dirname, FILE_DIR),
  OUTPUT_DIR = path.join(__dirname, DIR_OUT);

fs.ensureDirSync(path.join(__dirname, DIR_OUT));

fs.readdirSync(path.join(__dirname, FILE_DIR))
  .filter((file) => path.extname(file) === '.yaml')
  .forEach((file) => {
    const inputName = path.join(INPUT_DIR, file);
    const outputName = path.join(
      OUTPUT_DIR,
      path.parse(inputName).name + '.json',
    );
    const res = read(inputName, { schema: GRAMMAR_SCHEMA });

    fs.writeFileSync(outputName, JSON.stringify(res, null, 2), {
      encoding: 'utf8',
    });
  });
