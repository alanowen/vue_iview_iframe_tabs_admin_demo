const path = require('path')
const process = require('process')
const fs = require('fs')

const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const baseConfig = require('./webpack.base.config')

module.exports = (env, argv) => {

    fs.open('./src/config/env.js', 'w', function(err, fd) {
        let buf = 'export default "development";'
        if (argv.mode == "production") {
            buf = 'export default "production";'
        }
        fs.write(fd, buf, 0, buf.length, function(err, written, buffer) {})
    })

    let plugins = []

    if (argv.mode == "development") {
        plugins.push(new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map',
            exclude: ['vendor.js']
        }))
    }

    return merge(baseConfig.config, {
        entry: {
            ...baseConfig.makeEntries('./src/pages/'),
            vendor: path.resolve(__dirname, './src/vendor.js')
        },
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: argv.mode == 'production' ? 'public/[name].[hash].js' : 'public/[name].js'
        },
    
        plugins: [
            new VueLoaderPlugin(),
            ...plugins,
            ...baseConfig.makeEntryHtmls('./src/pages')
        ]
    })
}