const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

function debugDecoderCalls(ast, decoderName = "_0x3d83") {

    let count = 0;

    traverse(ast, {

        CallExpression(path) {

            if (
                !t.isIdentifier(path.node.callee) ||
                path.node.callee.name !== decoderName
            ) {
                return;
            }

            count++;

            console.log("\nCALL #" + count);
            console.log(generate(path.node).code);

            console.log("Argument types:");

            path.node.arguments.forEach(arg => {
                console.log("  -", arg.type);
            });

            // Stop after 20 calls
            if (count >= 20)
                path.stop();

        }

    });

}

module.exports = {
    debugDecoderCalls
};



