const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    resolve: {
        alias: {
            leaflet_css: __dirname + "/node_modules/leaflet/dist/leaflet.css",
        }
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
                query: {
                    mimetype: 'image/png'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/img'),
                to: path.resolve(__dirname, 'dist/img')
            }]
        })
    ]
};