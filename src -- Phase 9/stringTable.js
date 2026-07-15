const traverse = require("@babel/traverse").default;

function inspectStringTable(ast) {

    let info = null;

    traverse(ast, {

        FunctionDeclaration(path) {

            if (path.node.id?.name !== "_0x3ebc")
                return;

            info = {
                statements: path.node.body.body.length,
                body: path.node.body.body
            };

        }

    });

    return info;

}

module.exports = {
    inspectStringTable
};

