const traverse = require("@babel/traverse").default;

function detect(ast) {

    const result = {
        decoderFunctions: [],
        suspiciousFunctions: []
    };

    traverse(ast, {

        FunctionDeclaration(path) {

            const name = path.node.id?.name;

            if (!name) return;

            // Matches names like _0x3d83
            if (/^_0x[a-f0-9]+$/i.test(name)) {
                result.suspiciousFunctions.push(name);
            }

        }

    });

    return result;
}

module.exports = {
    detect
};

