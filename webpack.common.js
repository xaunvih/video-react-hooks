const path = require('path')
const fs = require('fs')

module.exports = {
    entry: path.join(__dirname, 'public/index.tsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'main.js',
        library: 'VideoReact',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            'video-react-hooks': path.resolve(__dirname, 'src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    cacheDirectory: true,
                },
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            },
        ],
    },
}
