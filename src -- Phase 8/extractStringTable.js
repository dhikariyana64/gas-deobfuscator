const traverse = require("@babel/traverse").default;
const t = require("@babel/types");

function extractStringTable(ast) {

    let strings = [];

    traverse(ast, {

        FunctionDeclaration(path) {

            if (path.node.id?.name !== "_0x3ebc")
                return;

            const body = path.node.body.body;

            const declaration = body[0];

            if (!t.isVariableDeclaration(declaration))
                return;

            const init =
                declaration.declarations[0].init;

            if (!t.isArrayExpression(init))
                return;

            strings = init.elements.map(e => {

                if (t.isStringLiteral(e))
                    return e.value;

                return null;

            });

        }

    });

    return strings;

}

module.exports = {
    extractStringTable
};


