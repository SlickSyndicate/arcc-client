const path = require('path');
const webpack = require('webpack');
const StatsPlugin = require('stats-webpack-plugin');

let developmentConfig = require('./webpack.config');
developmentConfig.debug = false;
developmentConfig.plugins = [
    new webpack.DefinePlugin({
        __API_ENDPOINT__: "'//api.arcc.rocks'",
        __COOKIE_HOST__: "'.arcc.rocks'"
    }),
    new webpack.ProvidePlugin({
        m: "mithril",
        _: "lodash",
        Phaser: "phaser"
    }),
    new webpack.optimize.OccurenceOrderPlugin(true), // true = Prefer entry chunks
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "bundles/vendor.[hash].bundle.js",
        minChunks: Infinity
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            screw_ie8: true
        },
        comments: false,
        sourceMap: true
    }),
    new webpack.NoErrorsPlugin(),
    new StatsPlugin('stats.json', {
        chunkModules: true,
        exclude: [/node_modules/]
    })
];
developmentConfig.output = {
    filename: "bundles/[name].[hash].bundle.js",
    chunkFilename: "chunks/[name].[chunkhash].chunk.js",
    path: __dirname + "/dist",
    publicPath: "//arcc.rocks/"
};

module.exports = developmentConfig;