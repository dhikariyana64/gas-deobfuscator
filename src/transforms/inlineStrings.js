const traverse = require("@babel/traverse").default;
const t = require("@babel/types");

function inlineStrings(ast, stringTable) {

    let replacements = 0;

    traverse(ast, {

        CallExpression(path) {

            const callee = path.node.callee;

            if (
                !t.isIdentifier(callee) ||
                callee.name === "_0x3d83"
            ) {
                return;
            }

            const arg = path.node.arguments[0];

            if (!t.isNumericLiteral(arg)) {
                return;
            }

            const index = arg.value - 0xA5;

            if (
                index < 0 ||
                index >= stringTable.length
            ) {
                return;
            }

            path.replaceWith(
                t.stringLiteral(stringTable[index])
            );

            replacements++;

        }

    });

    return replacements;
}

module.exports = {
    inlineStrings
};



