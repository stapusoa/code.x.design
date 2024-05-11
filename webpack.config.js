module.exports = {
	entry: './src/code.js',
	mode: "production",
	output: {
		path: path.resolve(__dirname, 'dist'),
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
		],
	}
};