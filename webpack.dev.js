const { merge } = require('webpack-merge')
const path = require('path')
const webpackCommon = require('./webpack.common')
const ESLintPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(webpackCommon, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new ESLintPlugin({
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html'),
        }),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'src'),
        watchContentBase: true,
        inline: true,
        hot: true,
        open: true,
    },
})
