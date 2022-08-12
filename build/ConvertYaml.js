'use strict';

var fs = require('fs-extra');
var GRAMMAR_SCHEMA = require('./CustomYamlTypes').GRAMMAR_SCHEMA;
var read = require('yaml-import').read;
var path = require('path');

const FILE_DIR = '../syntaxes/',
  DIR_OUT = '../out',
  INPUT_DIR = path.join(__dirname, FILE_DIR),
  OUTPUT_DIR = path.join(__dirname, DIR_OUT);

fs.ensureDirSync(path.join(__dirname, DIR_OUT));

fs.readdirSync(path.join(__dirname, FILE_DIR))
  .filter((file) => path.extname(file) === '.yaml')
  .forEach((file) => {
    var inputName = path.join(INPUT_DIR, file);
    var outputName = path.join(
      OUTPUT_DIR,
      path.parse(inputName).name + '.json'
    );
    var res = read(inputName, null, GRAMMAR_SCHEMA);

    fs.writeFileSync(outputName, JSON.stringify(res, null, 2), {
      encoding: 'utf8',
    });
  });
