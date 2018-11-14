const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const baseConfig = require('./webpack.base.config.js')

fs.open('./src/config/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, function(err, written, buffer) {})
})

module.exports = merge(baseConfig, {
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },

    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },    

    plugins: [
        //new VueLoaderPlugin(),
    ],

    mode: 'development'
})