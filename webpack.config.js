module.exports = {

	entry: './code.ts',

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
	
		],
	
	},

};