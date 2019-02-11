"use strict";

var fs = require('fs');
var jsYaml = require('js-yaml');
var GRAMMAR_SCHEMA = require("./CustomYamlTypes").GRAMMAR_SCHEMA;

const FILE_IN = "syntaxes/mermaid.tmLanguage.yaml",
    FILE_OUT = "syntaxes/mermaid.tmLanguage.json";

var res = jsYaml.load(fs.readFileSync(FILE_IN, "utf8"), { schema: GRAMMAR_SCHEMA });

var vfd = fs.openSync(FILE_OUT, "w");
fs.writeSync(vfd, JSON.stringify(res, null, 2), null, "utf8");
fs.closeSync(vfd);
