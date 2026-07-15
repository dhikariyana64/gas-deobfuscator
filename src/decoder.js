const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;

function printDecoder(ast) {
    traverse(ast, {
        FunctionDeclaration(path) {
            if (path.node.id?.name === "_0x3d83") {
                console.log("\n===== Decoder Function =====\n");
                console.log(generate(path.node).code);
                path.stop(); // Stop after finding the first match
            }
        }
    });
}

module.exports = {
    printDecoder
};



