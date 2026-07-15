const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

function findReferences(ast, name = "_0x3d83") {

    let count = 0;

    traverse(ast, {

        Identifier(path) {

            if (path.node.name !== name)
                return;

            count++;

            console.log("\n===== Reference #" + count + " =====");
            console.log("Parent:", path.parent.type);

            try {
                console.log(generate(path.parent).code);
            } catch {
                console.log("(unable to generate)");
            }

        }

    });

}

module.exports = {
    findReferences
};

