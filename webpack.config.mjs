import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import UnoCSS from '@unocss/webpack';

// This converts the module URL to a path, similar to __dirname in CommonJS
const __dirname = dirname(fileURLToPath(import.meta.url));

export default (env, argv) => ({
    mode: argv.mode === 'production' ? 'production' : 'development',
    devtool: argv.mode === 'production' ? false : 'inline-source-map',
    entry: {
        code: './src/code.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist'),
    },
    plugins: [
        UnoCSS(),
    ]
});
