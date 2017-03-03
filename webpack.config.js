var path = require('path');

var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var viewPath = path.resolve(__dirname, 'client/view');
var modelPath = path.resolve(__dirname, 'client/model');
var controllerPath = path.resolve(__dirname, 'client/controller');
var indexDir = path.resolve(__dirname, 'client/view/index');
var buildDir = path.resolve(__dirname, 'build');
var runTimeDir = path.resolve(__dirname, 'runtime');

module.exports = {
    entry: path.resolve(controllerPath + "/core", 'main.js'),
    output: {
        path: buildDir,
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: buildDir,
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
            { test: /\.css$/, exclude: /node_modules/, loader: "css-loader" },
            { test: /\.scss$/, exclude: /node_modules/, loaders: ["style", "css", "sass"]},
            { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/, exclude: /node_modules/, loader : 'file-loader?limit=100000&name=[path][name].[ext]'},
            { test: /\.json$/, exclude: /node_modules/, loader: "json" },
            { test: /\.html$/, loader: "html" },
            { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url-loader??limit=100000&name=[path][name].[ext]' }
        ]
    },
    resolve: {
        root: path.resolve(__dirname),
        alias: {
            model: modelPath,
            view: viewPath,
            sections: viewPath + "/sections",
            component : viewPath+ "/component",
            controller: controllerPath,
            base : controllerPath + "/base",
            util : controllerPath + '/util',
            enum : modelPath + '/enum',
            runTime : runTimeDir
        }
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin([
            { from: runTimeDir } // to: output.path
        ]),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: indexDir + '/index.html'
        })
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};