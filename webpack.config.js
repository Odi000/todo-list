const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode : "production",
    entry: "./src/main.js",
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "docs"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.css/i,
                use: ["style-loader", "css-loader"]
            },
        ]
    }
}