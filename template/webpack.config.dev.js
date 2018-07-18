const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const env = require('./build/dev.env');

module.exports = {
    entry: './src/main.ts',
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'vue-style-loader', 'css-loader']
            },
            { 
                test: /\.vue$/, 
                loader: 'vue-loader'
            },
            { 
                test: /\.tsx?$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        appendTsSuffixTo: [/\.vue$/],
                        transpileOnly: true
                    }
                } 
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devServer: {
        overlay: true,
        hot: true
    },
    resolve: {
        extensions: [ '.ts', '.js', '.vue' ],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new CleanWebpackPlugin([ 'dist ']),
        new DefinePlugin({
            'process.env': env
        }),
        new ForkTsCheckerWebpackPlugin({
            tsconfig: './tsconfig.json',
            tslint: './tslint.json',
            vue: true
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            hash: true
        }),
        new NamedModulesPlugin(),
        new VueLoaderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]
}