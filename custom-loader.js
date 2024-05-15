// custom-loader.js
const parseTSX = require('./tsx-parser');

module.exports = function(source) {
    const parsedData = parseTSX(source);
    return `export default ${JSON.stringify(parsedData)}`;
};
