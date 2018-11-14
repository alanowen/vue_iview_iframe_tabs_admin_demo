const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const baseConfig = require('./webpack.base.config.js')

fs.open('./src/config/env.js', 'w', function(err, fd) {
    const buf = 'export default "production";';
    fs.write(fd, buf, 0, buf.length, function(err, written, buffer) {})
})

module.exports = merge(baseConfig, {
    // entry: {
    //     index: path.resolve(__dirname, './src/pages/index/main.js'),
    //     sysMenuManage: path.resolve(__dirname, './src/pages/sys_menu_manage/main.js'),
    //     vendor: path.resolve(__dirname, './src/vendor.js')
    // },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },

    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },    

    // plugins: [
    //     //new VueLoaderPlugin(),
    //     new HtmlWebpackPlugin({
    //         filename: 'index.html',
    //         chunks: ['index', 'vendor'],
    //         template: path.resolve(__dirname, './src/assets/template/index.html')

    //      }),
    //     new HtmlWebpackPlugin({
    //         filename: 'sysMenuManage.html',
    //         chunks: ['sysMenuManage', 'vendor'],
    //         template: path.resolve(__dirname, './src/assets/template/tab_page.html')
    //     })
    // ],

    mode: 'production'
})