const path = require('path')

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
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules)/,
                options: {
                    cacheDirectory: true,
                },
            },
        ],
    },
}
