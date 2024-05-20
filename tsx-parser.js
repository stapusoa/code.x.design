const ts = require('typescript');

function parseTSX(source, sourceFileName = 'tempFile.tsx') {
    const sourceFile = ts.createSourceFile(
        sourceFileName,
        source,
        ts.ScriptTarget.ES2015, // Adjust target as necessary
        true,
        ts.ScriptKind.TSX
    );

    let componentInfo = {
        props: {},
        methods: {},
        jsx: []
    };

    function visit(node) {
        if (ts.isFunctionDeclaration(node) || ts.isArrowFunction(node)) {
            // Collect function names and signatures
            const name = node.name ? node.name.getText() : 'anonymous';
            const signature = node.getText();
            componentInfo.methods[name] = signature;
        }

        if (ts.isJsxElement(node) || ts.isJsxSelfClosingElement(node)) {
            // Collect JSX elements
            const tagName = ts.isJsxElement(node) ? node.openingElement.tagName.getText() : node.tagName.getText();
            componentInfo.jsx.push(tagName);
        }

        if (ts.isVariableStatement(node)) {
            const declaration = node.declarationList.declarations[0];
            if (declaration.initializer && ts.isArrowFunction(declaration.initializer)) {
                const name = declaration.name.getText();
                componentInfo.name = name;
                if (declaration.initializer.parameters.length > 0) {
                    const props = declaration.initializer.parameters[0];
                    if (props.type) {
                        componentInfo.props = parseProps(props.type);
                    }
                }
            }
        }

        ts.forEachChild(node, visit);
    }

    function parseProps(node) {
        let props = {};
        if (ts.isTypeLiteralNode(node)) {
            node.members.forEach(member => {
                if (ts.isPropertySignature(member)) {
                    const propName = member.name.getText();
                    const propType = member.type.getText();
                    props[propName] = propType;
                }
            });
        }
        return props;
    }

    ts.forEachChild(sourceFile, visit);
    return componentInfo;
}

module.exports = parseTSX;
