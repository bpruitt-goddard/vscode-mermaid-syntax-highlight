import fs from 'node:fs';
import path from 'node:path';
import util from 'node:util';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

export const RegexYamlType = new yaml.Type('!regex', {
  kind: 'scalar',
  construct: function (data) {
    return (
      // Make regex case-insensitive since this cannot be applied globally
      `(?i)${data}`
        //Remove end of line comments (space then #)
        .replace(/(^|\s)#.*/g, '')
        //Remove new lines from yaml multistring
        .replace(/\n/g, '')
    );
  },
});

export const GRAMMAR_SCHEMA = yaml.DEFAULT_SCHEMA.extend([RegexYamlType]);

// do not execute the following if file is required (http://stackoverflow.com/a/6398335)
const __filename = fileURLToPath(import.meta.url);
if (process.argv?.[1] === __filename) {
  // And read a document using that schema.
  fs.readFile(
    path.join(__dirname, 'custom_types.yml'),
    'utf8',
    function (error, data) {
      let loaded;

      if (!error) {
        loaded = yaml.load(data, { schema: GRAMMAR_SCHEMA });
        console.log(util.inspect(loaded, false, 20, true));
      } else {
        console.error(error.stack || error.message || String(error));
      }
    },
  );
}
