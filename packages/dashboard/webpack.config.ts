import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";
import {getTsLoaderOptions} from "./webpack/helper";

const resolve = (...args: Array<string>) => path.join(__dirname, ...args);

const webpackConfig: webpack.Configuration = {
    entry: {entry: resolve("src/index.tsx")},
    mode: "development",
    context: resolve("src"),
    output: {
        filename: "[name].js",
        path: resolve("dist"),
        publicPath: "/"
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx", ".less"]
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader"},
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader"},
                ],
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: getTsLoaderOptions({})
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),
        new HtmlWebpackPlugin({
            template: resolve("resources/index.html")
        })
    ],
    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9005
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                    priority: 0
                },
                styles: {
                    name: "styles",
                    test: /\.css$/,
                    chunks: "all",
                    enforce: true
                }
            }
        }
    }
};

export default webpackConfig;