const { merge } = require('webpack-merge')
const { HotModuleReplacementPlugin } = require('webpack')
const path = require('path')
const webpackCommon = require('./webpack.common')
const ESLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(webpackCommon, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new ESLintPlugin({
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        }),
        new CleanWebpackPlugin(),
        new HotModuleReplacementPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true,
        inline: true,
        hot: true,
        open: true,
    },
})
