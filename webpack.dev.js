const { merge } = require('webpack-merge')
const path = require('path')
const webpackCommon = require('./webpack.common')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = merge(webpackCommon, {
    mode: 'development',
    devtool: 'eval-source-map',
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
        }),
        new ESLintPlugin({
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
        }),
        new CleanWebpackPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        watchContentBase: true,
        inline: true,
        hot: true,
        open: true,
    },
})
