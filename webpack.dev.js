const { merge } = require('webpack-merge')
const path = require('path')
const webpackCommon = require('./webpack.common')

module.exports = merge(webpackCommon, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        inline: true,
        hot: true,
        compress: true,
        open: true,
        writeToDisk: false,
    },
})
