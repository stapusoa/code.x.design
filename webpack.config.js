const path = require('path');

module.exports = {
	entry: './code.js',
	mode: "production",
	output: {
		path: __dirname,
		filename: "code.js",
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', ".json"],
	},
	module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  }  
};