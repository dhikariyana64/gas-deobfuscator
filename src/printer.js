const generate = require("@babel/generator").default;
const fs = require("fs");

function writeOutput(ast, filename) {
    const code = generate(ast, {
        comments: true,
        retainLines: false,
        compact: false
    }).code;

    fs.mkdirSync("output", { recursive: true });
    fs.writeFileSync(filename, code);
}

module.exports = { writeOutput };



