const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

fs.open('./src/config/env.js', 'w', function(err, fd) {
    const buf = 'export default "development";';
    fs.write(fd, buf, 0, buf.length, function(err, written, buffer) {})
})

module.exports = {
    entry: {
        index: path.resolve(__dirname, './src/pages/index/main.js'),
        systemMenuManage: path.resolve(__dirname, './src/pages/system_menu_manage/main.js'),
        vendor: path.resolve(__dirname, './src/vendor.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[hash].js'
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader'
                    }, 
                    {
                        loader: 'iview-loader',
                        options: {
                            prefix: false
                        }
                    }
                ]
            },
            { test: /\.js/, use: 'babel-loader' },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(png)|(jpg)|(gif)|(woff)|(svg)|(eot)|(ttf)$/, use: 'file-loader' }
        ]
    },

    devServer: {
        contentBase: './dist',
        historyApiFallback: true
    },    

    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index', 'vendor'],
            template: path.resolve(__dirname, './src/assets/template/index.html')

         }),
        new HtmlWebpackPlugin({
            filename: 'systemMenuManage.html',
            chunks: ['systemMenuManage', 'vendor'],
            template: path.resolve(__dirname, './src/assets/template/tab_page.html')
        })
    ],

    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@libs': path.resolve(__dirname, './src/libs'),
            '@components': path.resolve(__dirname, './src/components'),
            '@mock': path.resolve(__dirname, './src/mock')
        }
    },

    mode: 'development'
}