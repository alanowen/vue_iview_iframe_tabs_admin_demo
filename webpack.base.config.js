const path = require('path')
const process = require('process')
const fs = require('fs')

const HtmlWebpackPlugin = require('html-webpack-plugin')


function makeEntries(entriesFolder, targetFile='main.js') {

    let entries = {}

    fs.readdirSync(entriesFolder).forEach(file => {
        let p = path.join(entriesFolder, file)
        if (fs.lstatSync(p).isDirectory()) {
            if (fs.readdirSync(p).includes(targetFile)) {
                entries[file] = path.resolve(__dirname, p, targetFile)
            }
        }
    })
    return entries
}

function makeEntryHtmls(entriesFolder, targetFile='main.js', tamplate='./src/assets/template/tab_page.html', chunks=['vendor']) {

    let entryHtmls = []

    fs.readdirSync(entriesFolder).forEach(file => {
        let p = path.join(entriesFolder, file)
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

    makeEntries,

    makeEntryHtmls,
    
    config: {
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

        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                '@libs': path.resolve(__dirname, './src/libs'),
                '@components': path.resolve(__dirname, './src/components'),
                '@assets': path.resolve(__dirname, './src/assets'),
            }
        }
    }
}