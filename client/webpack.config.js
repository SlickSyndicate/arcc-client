const path = require('path');
const webpack = require('webpack');

const autoprefixer = require('autoprefixer');

module.exports = {
    devtool: '#source-map',
    debug: true,

    resolve: {
        extensions: ['', '.js'],
        modulesDirectories: ['src/assets', 'src/app', 'src/game', 'node_modules']
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
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
                    presets: ['es2015', 'stage-0']
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
        main: ["./src/app/entry.js"],
        // vendor: [
        //     "mithril",
        //     // "./assets/lib/pixi.js",
        //     // "./assets/lib/phaser.js"
        // ]
    },
    externals: {
        "jquery": "jQuery",
        "phaser": "Phaser",
        "mithril": "m"
    }
};