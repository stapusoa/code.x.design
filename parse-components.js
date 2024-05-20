const fs = require('fs');
const path = require('path');
const parseTSX = require('./tsx-parser');

const basePath = path.resolve(__dirname, './travelpass-design-system/src/components');
const outputDirectory = process.env.OUTPUT_DIRECTORY || path.resolve(__dirname, './dist');

if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
}

const getAllRelevantFiles = (dir, fileList = []) => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        if (fs.statSync(filePath).isDirectory()) {
            getAllRelevantFiles(filePath, fileList);
        } else if (
            (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) &&
            !filePath.endsWith('.stories.tsx') &&
            !filePath.endsWith('.test.tsx')
        ) {
            fileList.push(filePath);
        }
    });
    return fileList;
};

const componentDirs = fs.readdirSync(basePath).filter(file => {
    const filePath = path.join(basePath, file);
    return fs.statSync(filePath).isDirectory();
});

componentDirs.forEach(componentDir => {
    const componentPath = path.join(basePath, componentDir);
    const componentFiles = getAllRelevantFiles(componentPath);

    let combinedComponentDetails = {
        name: componentDir,
        props: {},
        methods: {},
        jsx: []
    };

    componentFiles.forEach(filePath => {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const fileDetails = parseTSX(fileContent, path.basename(filePath));

            combinedComponentDetails = {
                ...combinedComponentDetails,
                props: { ...combinedComponentDetails.props, ...fileDetails.props },
                methods: { ...combinedComponentDetails.methods, ...fileDetails.methods },
                jsx: [...combinedComponentDetails.jsx, ...fileDetails.jsx]
            };
        } catch (error) {
            console.error(`Error processing ${filePath}: ${error}`);
        }
    });

    const outputFile = path.join(outputDirectory, `parsed-${componentDir}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(combinedComponentDetails, null, 2), 'utf-8');
});
