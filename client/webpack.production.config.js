var path = require('path');
var webpack = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');

const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'resolve-url',
    'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src/assets')
];

module.exports = {
    devtool: '#source-map',
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ],
        loaders: [
            {
                loader: 'babel-loader',
                test: /\.js?$/,
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0']
                }
            }, {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }, {test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"}

        ]
    },
    resolveLoader: {root: path.join(__dirname, 'node_modules')},
    plugins: [
        new ExtractTextPlugin('[name].css'),
        new webpack.DefinePlugin({
            __API_ENDPOINT__: "'//api.modmountain.com'",
            __COOKIE_HOST__: "'.modmountain.com'",
            __ALGOLIA_APP_ID__: "'Y4MFCYHZJD'",
            __ALGOLIA_API_KEY__: "'72585954cb90e5b5ab7f569fabf0606d'"
        }),
        new webpack.ProvidePlugin({
            m: "mithril",
            _: __dirname + "/src/app/plugins/lodash.js"
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
        new BellOnBundlerErrorPlugin(),
        new StatsPlugin('stats.json', {
            chunkModules: true,
            exclude: [/node_modules/]
        })
    ],
    output: {
        filename: "bundles/[name].[hash].bundle.js",
        chunkFilename: "chunks/[name].[chunkhash].chunk.js",
        path: __dirname + "/dist",
        publicPath: "//cdn.modmountain.com/"
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['src/assets', 'src/app', 'node_modules']
    },
    entry: {
        main: ["./src/app/entry.js"],
        vendor: [
            "mithril", "./src/app/plugins/bootbox.js",
            "./src/app/plugins/lodash.js",  "./src/app/plugins/revolution-slider/jquery.themepunch.revolution.js",
            "gsap", "jquery-touchswipe", "fancybox", "fingerprintjs2"
        ]
    },
    externals: {
        "jquery": "jQuery"
    }
};