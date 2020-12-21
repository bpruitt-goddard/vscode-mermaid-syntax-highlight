"use strict";

var fs = require('fs');
var GRAMMAR_SCHEMA = require("./CustomYamlTypes").GRAMMAR_SCHEMA;
var read = require('yaml-import').read;
var path = require('path');

const FILE_IN = '../syntaxes/mermaid.tmLanguage.yaml',
    FILE_OUT = '../syntaxes/mermaid.tmLanguage.json';

const res = read(path.join(__dirname,  FILE_IN), null, GRAMMAR_SCHEMA) ;

var vfd = fs.openSync(path.join(__dirname, FILE_OUT), "w");
fs.writeSync(vfd, JSON.stringify(res, null, 2), null, "utf8");
fs.closeSync(vfd);
