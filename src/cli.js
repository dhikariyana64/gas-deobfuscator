#!/usr/bin/env node

const { parseFile } = require("./parser");

const filename = process.argv[2];

if (!filename) {

    console.log("Usage:");

    console.log("node src/cli.js file.js");

    process.exit(1);

}

console.log("Parsing...");

try {

    const result = parseFile(filename);
    
    const { analyze } = require("./analyzer");

    const stats = analyze(result.ast);

    console.log();

    console.log("===== AST Statistics =====");

    console.log("Functions       :", stats.functions);

    console.log("Variables       :", stats.variables);

    console.log("Function Calls  :", stats.calls);

    console.log("String Literals :", stats.strings);

    console.log("Numeric Literals:", stats.numbers);

    console.log("Largest Function:", stats.largestFunction);

    console.log("Success!");

    console.log();

    console.log("Source length:");

    console.log(result.source.length);

}

catch (err) {

    console.error(err.message);

}