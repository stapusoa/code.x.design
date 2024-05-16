const fs = require('fs');
const path = require('path');
const parseTSX = require('./tsx-parser');

// Base path for components
const basePath = process.env.COMPONENTS_BASE_PATH || './design-system/src';

// Output directory for JSON files
const outputDirectory = process.env.OUTPUT_DIRECTORY || path.resolve(__dirname, './dist');

// Ensure the output directory exists
if (!fs.existsSync(outputDirectory)){
    fs.mkdirSync(outputDirectory, { recursive: true });
}

const components = [
  'chips/chip.tsx',
  'Icon/Icon.tsx',
  'button.tsx'
];

components.forEach(component => {
  const componentPath = path.join(basePath, '/components', component);
  try {
    const fileContent = fs.readFileSync(componentPath, 'utf-8');
    const componentDetails = parseTSX(fileContent, path.basename(componentPath));

    // Write the parsed data to the specified output directory
    const outputFile = path.join(outputDirectory, `parsed-${path.basename(componentPath, '.tsx')}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(componentDetails, null, 2), 'utf-8'); // Use null, 2 for pretty-printing
  } catch (error) {
    console.error(`Error processing ${componentPath}: ${error}`);
  }
});

