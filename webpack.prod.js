const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common')

module.exports = merge(webpackCommon, {
    mode: 'production',
    devtool: false,
    output: {
        filename: '[name].min.js',
    },
    externals: {
        react: {
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react',
            root: 'React',
        },
        'react-dom': {
            commonjs: 'react-dom',
            commonjs2: 'react-dom',
            amd: 'react-dom',
            root: 'ReactDOM',
        },
    },
    optimization: {
        minimizer: [new TerserPlugin()],
    },
})
