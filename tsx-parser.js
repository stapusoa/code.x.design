const ts = require('typescript');

function parseTSX(source, sourceFileName = 'tempFile.tsx') {
    const sourceFile = ts.createSourceFile(
        sourceFileName,
        source,
        ts.ScriptTarget.ES2015, // Adjust target as necessary
        true,
        ts.ScriptKind.TSX
    );

    let componentInfo = {};

    function visit(node) {
        if (ts.isJsxElement(node)) {
            componentInfo[node.kind] = node.getText(sourceFile);
        }
        ts.forEachChild(node, visit);
    }

    ts.forEachChild(sourceFile, visit);
    return componentInfo;
}

module.exports = parseTSX;
