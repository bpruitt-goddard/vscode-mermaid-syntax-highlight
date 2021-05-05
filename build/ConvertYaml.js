"use strict";

var fs = require('fs-extra');
var GRAMMAR_SCHEMA = require("./CustomYamlTypes").GRAMMAR_SCHEMA;
var read = require('yaml-import').read;
var path = require('path');

const FILE_IN = '../syntaxes/mermaid.tmLanguage.yaml',
    DIR_OUT = '../out',
    FILE_OUT = `${DIR_OUT}/mermaid.tmLanguage.json`;

const res = read(path.join(__dirname,  FILE_IN), null, GRAMMAR_SCHEMA) ;

fs.ensureDirSync(path.join(__dirname, DIR_OUT));
fs.writeFileSync(path.join(__dirname, FILE_OUT), JSON.stringify(res, null, 2), {
    encoding: "utf8"
});
