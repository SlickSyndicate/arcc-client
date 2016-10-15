import gulp             from "gulp";
import gulpLoadPlugins  from "gulp-load-plugins";
import runSequence      from 'run-sequence';
import del              from 'del';

const $ = gulpLoadPlugins();
const srcDir = "src";

// Generate the HTML
gulp.task('html', () => {
    // Production settings
    if ($.util.env.production) {
        var injectSources = gulp.src(['dist/bundles/vendor**.js','dist/bundles/main**.js'], {read: false});

        gulp.src(srcDir + '/assets/index.html')
            .pipe($.inject(injectSources, {
                ignorePath: "/dist",
                removeTags: true
            }))
            .pipe($.if('*.js', $.uglify({comments: false, discardComments: {removeAll: true}})))
            .pipe($.if('*.css', $.cssnano({zindex: false})))
            .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
            .pipe($.cdnizer({
                defaultCDNBase: '//cdn.arcc.rocks/',
                files: ['**/*.{bundle.js,css,gif,png,jpg,jpeg}']
            }))
            .pipe(gulp.dest('dist'))
    }
    // Development settings
    else {
        gulp.src(srcDir + '/assets/index.html')
            .pipe(gulp.dest('dist'))
    }
});

// Runs Webpack to build our JS files
gulp.task('webpack', () => {
    var webpackConfig = './webpack.config.js';
    if ($.util.env.production) webpackConfig = './webpack.production.config.js';

    var webpack = require('webpack-stream');

    return gulp.src(srcDir + '/app/scripts/entry.js')
        .pipe($.plumber())
        .pipe(webpack(require(webpackConfig)))
        .pipe(gulp.dest('dist/'))
});

gulp.task('serve', ["html"], () => {
    if ($.util.env.production) return console.error("Serve is not supported in production mode");

    var webpack              = require('webpack');
    var browserSync          = require('browser-sync').create();
    var webpackDevMiddleware = require('webpack-dev-middleware');
    var stripAnsi            = require('strip-ansi');
    var historyApiFallback   = require("connect-history-api-fallback");

    var webpackConfig = require('./webpack.config');
    var bundler       = webpack(webpackConfig);

    bundler.plugin('done', function (stats) {
        if (stats.hasErrors() || stats.hasWarnings()) {
            return browserSync.sockets.emit('fullscreen:message', {
                title: "Webpack Error:",
                body:  stripAnsi(stats.toString()),
                timeout: 100000
            });
        }
        browserSync.reload();
    });

    browserSync.init({
        server: 'dist',
        open: false,
        logFileChanges: false,
        port: 9002,
        middleware: [
            webpackDevMiddleware(bundler, {
                publicPath: webpackConfig.output.publicPath,
                stats: {colors: true}
            }),
            historyApiFallback()
        ],
        plugins: ['bs-fullscreen-message'],
        files: [
            'dist/*.html'
        ]
    });
});

gulp.task('clean', del.bind(null, ['dist']));

gulp.task('build', () => {
    runSequence('clean', 'webpack', 'html', () => gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true})));
});

gulp.task('default', ['clean'], () => {
    gulp.start('serve');
});
