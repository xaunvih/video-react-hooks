const { merge } = require('webpack-merge')
const webpackCommon = require('./webpack.common')

module.exports = merge(webpackCommon, {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
        inline: true,
        hotOnly: true,
        compress: true,
        open: true,
        writeToDisk: false,
    },
})
