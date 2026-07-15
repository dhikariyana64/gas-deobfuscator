const traverse = require("@babel/traverse").default;

function inspectFunctions(ast) {

    const results = [];

    traverse(ast, {

        FunctionDeclaration(path) {

            const node = path.node;

            const name = node.id?.name ?? "<anonymous>";

            const info = {

                name,

                params: node.params.length,

                bodyStatements: node.body.body.length,

                start: node.start,

                end: node.end,

                size: node.end - node.start

            };

            results.push(info);

        }

    });

    results.sort((a, b) => b.size - a.size);

    return results;

}

module.exports = {
    inspectFunctions
};

