/*Created by Lata Tiwari on 7/13/2017.*/

let webpack = require('webpack');
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let BUILD_DIR = path.resolve(__dirname, 'src/client/public');
let APP_DIR = path.resolve(__dirname, 'src/client/app');
let ROOT = path.resolve(__dirname, 'build');
let config = {
    entry: [
        APP_DIR + '/index.jsx'
    ],
    output: {
        path: ROOT,
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)?/,
                include: APP_DIR,
                loader: 'babel-loader',
            },

            {
                test: /\.(css|scss)$/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },

            {
                test: /\.(png|jpg|gif|ico)$/,
                use: [
                    {
                        loader: 'url-loader?name=[name].[ext]',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
        ]
    },

    //historyApiFallback : to serve your index.html in place of 404
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'build/index.html'),
            filename: 'index.html',
            favicon: 'src/client/app/assets/images/favicon.ico',
            multistep: true,
            historyApiFallback: true
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],

    devServer: {
        hot: true,
        inline: true,
        contentBase: BUILD_DIR,
        historyApiFallback: true
    }
};

module.exports = config;