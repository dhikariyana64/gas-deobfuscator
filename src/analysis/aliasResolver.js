const traverse = require("@babel/traverse").default;
const t = require("@babel/types");

function resolveAliases(ast, targetName) {

    const aliases = new Set([targetName]);

    let changed = true;

    while (changed) {

        changed = false;

        traverse(ast, {

            VariableDeclarator(path) {

                const init = path.node.init;

                if (!t.isIdentifier(init))
                    return;

                if (!aliases.has(init.name))
                    return;

                const id = path.node.id;

                if (!t.isIdentifier(id))
                    return;

                if (!aliases.has(id.name)) {

                    aliases.add(id.name);

                    changed = true;

                }

            }

        });

    }

    return aliases;

}

module.exports = {
    resolveAliases
};



