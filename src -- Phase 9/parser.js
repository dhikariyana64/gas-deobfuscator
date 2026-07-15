const fs = require("fs");
const parser = require("@babel/parser");

function parseFile(filename) {

    const source = fs.readFileSync(filename, "utf8");

    const ast = parser.parse(source, {
        sourceType: "script",
        allowReturnOutsideFunction: true,
        plugins: [
            "jsx"
        ]
    });

    return {
        source,
        ast
    };

}

module.exports = {
    parseFile
};

