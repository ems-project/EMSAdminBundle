const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    plugins: [
        new CopyPlugin([
            {
                from: './public/assets/images',
                to: 'images'
            }, {
                from: './public/assets/cke-plugins',
                to: 'js/cke-plugins'
            }, {
                from: './node_modules/ace-builds/src-noconflict',
                to: 'js/ace',
            }, {
                from: '{config.js,contents.css,styles.js,adapters/**/*,lang/**/*,plugins/**/*,skins/**/*,vendor/**/*}',
                to: 'js/ckeditor',
                context: './node_modules/ckeditor4',
            },
        ], {
            ignore: [{
                dots: true,
                glob: 'samples/**/*'
            },{
                dots: true,
                glob: 'adapters/**/*'
            },{
                dots: true,
                glob: '.github/**/*'
            },{
                dots: true,
                glob: '**/*.php'
            }]
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].bundle.css",
            chunkFilename: "[id].css"
        }),
    ],
    context: path.resolve(__dirname, './'),
    entry: {
        'black': './public/assets/skins/black.js',
        'black-light': './public/assets/skins/black-light.js',
        'blue': './public/assets/skins/blue.js',
        'blue-light': './public/assets/skins/blue-light.js',
        'green': './public/assets/skins/green.js',
        'green-light': './public/assets/skins/green-light.js',
        'purple': './public/assets/skins/purple.js',
        'purple-light': './public/assets/skins/purple-light.js',
        'red': './public/assets/skins/red.js',
        'red-light': './public/assets/skins/red-light.js',
        'yellow': './public/assets/skins/yellow.js',
        'yellow-light': './public/assets/skins/yellow-light.js',
        'app': './public/assets/app.js',
        'edit-revision': './public/assets/edit-revision.js',
        'managed-alias': './public/assets/managed-alias.js',
        'user-profile': './public/assets/user-profile.js',
        'template': './public/assets/template.js',
        'hierarchical': './public/assets/hierarchical.js',
        'calendar': './public/assets/calendar.js',
        'criteria-view': './public/assets/criteria-view.js',
        'criteria-table': './public/assets/criteria-table.js',
        'i18n': './public/assets/i18n.js',
    },
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'js/[name].bundle.js',
        //publicPath: '../bundles/emscore/',
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        // you can specify a publicPath here
                        // by default it use publicPath in webpackOptions.output
                        publicPath: '../'
                    }
                },{
                    loader: 'css-loader', // translates CSS into CommonJS
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'less-loader' // compiles Less to CSS
                }]
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: '../'
                        }
                    },{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // 'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[ext]',
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    }
};