"use strict";

var fs = require('fs');
var glob = require('glob')
var jsYaml = require('js-yaml');
var GRAMMAR_SCHEMA = require("./CustomYamlTypes").GRAMMAR_SCHEMA;

function convert(fileIn) {
    const fileOut = fileIn.replace(/(\.yaml)?$/, '.json')
    var res = jsYaml.load(fs.readFileSync(fileIn, "utf8"), { schema: GRAMMAR_SCHEMA });

    fs.writeFileSync(fileOut, JSON.stringify(res, null, 2), {encoding: 'utf8'})
}
glob.sync('syntaxes/*.tmLanguage.yaml').forEach(convert)