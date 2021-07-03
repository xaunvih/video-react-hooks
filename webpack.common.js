const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.join(__dirname, 'src/index'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main.js',
        library: 'VideoReact',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    cacheCompression: false,
                    cacheDirectory: true,
                },
            },
        ],
    },
}
