const traverse = require("@babel/traverse").default;

function analyze(ast) {

    const stats = {

        functions: 0,
        variables: 0,
        calls: 0,
        strings: 0,
        numbers: 0,

        largestFunction: null,
        largestFunctionSize: 0

    };

    traverse(ast, {

        Function(path) {

            stats.functions++;

            const size = path.node.end - path.node.start;

            if (size > stats.largestFunctionSize) {

                stats.largestFunctionSize = size;

                stats.largestFunction =
                    path.node.id
                        ? path.node.id.name
                        : "<anonymous>";

            }

        },

        VariableDeclarator() {

            stats.variables++;

        },

        CallExpression() {

            stats.calls++;

        },

        StringLiteral() {

            stats.strings++;

        },

        NumericLiteral() {

            stats.numbers++;

        }

    });

    return stats;

}

module.exports = {

    analyze

};