const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        'index': './src/index.js',
    },
    output: {
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                test: /\.(png|jpg|jpeg|ico)$/i,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "public/index.html"
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        proxy: {
            '/api/**': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
}