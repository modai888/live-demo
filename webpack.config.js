'use strict'

const { join, resolve } = require('path')
const webpack = require('webpack')
const glob = require('glob')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var MultipageWebpackPlugin = require('multipage-webpack-plugin')

const extractCSS = new ExtractTextPlugin({
    filename: 'assets/css/[name].css',
    allChunks: true
})

const entries = {}
glob.sync('./src/pages/**/app.js').forEach(path => {
    const chunk = path.split('./src/pages/')[ 1 ].split('/app.js')[ 0 ]
    entries[ chunk ] = path
})

const config = {
    entry: entries,
    output: {
        path: resolve(__dirname, './dist'),
        filename: 'assets/js/[name].js',
        publicPath: '/'
    },
    resolve: {
        extensions: [ '.js', '.vue' ],
        alias: {
            assets: join(__dirname, '/src/assets'),
            styles: join(__dirname, '/src/styles'),
            components: join(__dirname, '/src/components'),
            root: join(__dirname, 'node_modules')
            // neplayer: join(__dirname, '/src/assets/js/neplayer.min.js')
        }
    },
    externals: {
        //neplayer: 'neplayer'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: [ 'css-hot-loader' ].concat(ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'style-loader'
                        })),
                        postcss: [ 'css-hot-loader' ].concat(ExtractTextPlugin.extract({
                            use: [ 'css-loader', 'postcss-loader' ],
                            fallback: 'style-loader'
                        })),
                        scss: [ 'css-hot-loader' ].concat(ExtractTextPlugin.extract({
                            use: [ 'css-loader', 'sass-loader' ],
                            fallback: 'style-loader'
                        }))
                    }
                }
            },
            {
                test: /\.min\.(js|css)$/,
                use: [ {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/[ext]/[name].[ext]'
                    }
                } ],
                include: /assets/
            },
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(css|pcss)$/,
                exclude: /assets/,
                use: [ 'css-hot-loader' ].concat(ExtractTextPlugin.extract({
                    use: [ 'css-loader', 'postcss-loader' ],
                    fallback: 'style-loader'
                }))
            },
            {
                test: /\.scss$/,
                use: [ 'css-hot-loader' ].concat(ExtractTextPlugin.extract({
                    use: [ 'css-loader', 'sass-loader' ],
                    fallback: 'style-loader'
                }))
            },
            {
                test: /\.html$/,
                use: [ {
                    loader: 'html-loader',
                    options: {
                        root: resolve(__dirname, 'src'),
                        attrs: [ 'img:src', 'link:href' ]
                    }
                } ]
            },
            {
                test: /\.swf/,
                use: [ {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/js/[name].[ext]'
                    }
                } ],
                include: /assets/
            },
            {
                test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
                exclude: /favicon\.png$/,
                use: [ {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'assets/img/[name].[hash:7].[ext]'
                    }
                } ]
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MultipageWebpackPlugin({
            // replace [name] in template path
            htmlTemplatePath: resolve('./src/pages/[name]/app.html'),
            templateFilename: '[name].html',
            templatePath: './',
            // some other options in htmlWebpackPlugin
            htmlWebpackPluginOptions: {
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
                hash: process.env.NODE_ENV === 'production'
            }
        }),
        extractCSS
    ],
    devServer: {
        host: '127.0.0.1',
        port: 8010,
        historyApiFallback: false,
        noInfo: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:2333',
                changeOrigin: true
                // pathRewrite: { '^/api': '' }
            },
            '/web': {
                target: 'http://127.0.0.1:2333',
                changeOrigin: true,
                pathRewrite: { '^/web': '' }
            }
        },
        open: true,
        openPage: 'course/list.html'
    },
    devtool: '#eval-source-map'
}

module.exports = config

if ( process.env.NODE_ENV === 'production' ) {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: true
        }),
        new OptimizeCSSPlugin()
    ])
}
