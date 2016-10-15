const path = require('path');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const sassLoaders = [
    'css-loader',
    'postcss-loader',
    'resolve-url',
    'sass-loader?sourceMap&indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './src/assets')
];

module.exports = {
    devtool: '#source-map',
    debug: true,

    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['src/assets', 'src/app', 'src/game', 'node_modules']
    },

    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loader: "source-map"
            }
        ],
        loaders: [
            {
                test: /\.js?$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                query: {
                    // plugins: ['transform-runtime', 'syntax-class-properties', 'transform-class-properties'],
                    // presets: ['es2017']
                    presets: ['stage-0', 'es2015']
                }
            }, {
                test: /\.css$/,
                loaders: ["style", "css", "resolve-url"]
            },{
                test: /\.scss$/,
                loaders: ["style", "css", "resolve-url", "sass?sourceMap"]
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }, {
                test: /\.(ttf|eot|woff|woff2|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "file"
            }

        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            m: "mithril",
            _: "lodash",
            Phaser: "phaser"
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    output: {
        filename: "bundles/[name].bundle.js",
        chunkFilename: "chunks/[name].chunk.js",
        path: __dirname + "/dist",
        publicPath: "/"
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    entry: {
        main: ["./src/app/entry.js"]
    },
    externals: {
        "jquery": "jQuery"
    }
};