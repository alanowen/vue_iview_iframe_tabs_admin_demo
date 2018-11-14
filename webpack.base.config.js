const path = require('path')
const fs = require('fs')

const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

function makeEntries(pagesFolder, targetFile='main.js') {

    let entries = {}

    fs.readdirSync(pagesFolder).forEach(file => {
        let p = path.join(pagesFolder, file)
        if (fs.lstatSync(p).isDirectory()) {
            if (fs.readdirSync(p).includes(targetFile)) {
                entries[file] = path.resolve(__dirname, p, targetFile)
            }
        }
    })
    return entries
}

function makeEntryHtmls(pagesFolder, targetFile='main.js', tamplate='./src/assets/template/tab_page.html', chunks=['vendor']) {
    let entryHtmls = []

    fs.readdirSync(pagesFolder).forEach(file => {
        let p = path.join(pagesFolder, file)
        if (fs.lstatSync(p).isDirectory()) {
            if (fs.readdirSync(p).includes(targetFile)) {

                entryHtmls.push(
                    new HtmlWebpackPlugin({
                        filename: `${file}.html`,
                        chunks: [file, ...chunks],
                        template: path.resolve(__dirname, tamplate)
                    })
                )
            }
        }
    })
    return entryHtmls
}

module.exports = {
    entry: {
        ...makeEntries('./src/pages/'),
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

    plugins: [
        new VueLoaderPlugin(),

        ...makeEntryHtmls('./src/pages')
    ],

    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@libs': path.resolve(__dirname, './src/libs'),
            '@components': path.resolve(__dirname, './src/components'),
            '@assets': path.resolve(__dirname, './src/assets'),
        }
    }
}