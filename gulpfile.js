var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');
var connect = require('gulp-connect');

var path = {
    REACT_ENTRIES: [
        './src/js/root.js'
    ],
    LESS: 'src/css/less/*.less',
    HTML: 'src/index.html',
    STATIC: 'src/static/**/*',

    OUT_JS: 'build.js',
    OUT_CSS: 'build.css',
    OUT_HTML: 'index.html',

    BUILD_JS: 'src/js',
    BUILD_CSS: 'src/css',

    DIST: 'dist',
    DIST_JS: 'dist/js',
    DIST_CSS: 'dist/css',
    DIST_STATIC: 'dist/static'
};

gulp.task('watch-js', function() {
    var bundler = browserify({
        entries: path.REACT_ENTRIES,
        debug: true, 
        cache: {}, packageCache: {}, fullPaths: true 
    }).transform("babelify", {presets: ["es2015", "react"]});

    var watcher  = watchify(bundler);

    return watcher.on('update', function () {
        watcher.bundle()
        .pipe(source(path.OUT_JS))
        .pipe(gulp.dest(path.BUILD_JS)).pipe(connect.reload());;
    })
    .bundle()
    .pipe(source(path.OUT_JS))
    .pipe(gulp.dest(path.BUILD_JS));
});

gulp.task('build-js', function(){
    browserify({
        entries: path.REACT_ENTRIES
    })
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source(path.OUT_JS))
    .pipe(streamify(uglify(path.OUT_JS)))
    .pipe(gulp.dest(path.DIST_JS));
});


gulp.task('watch-less', function () {
    gulp.src(path.LESS)
        .pipe(sourcemaps.init()) 
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(concat(path.OUT_CSS))
        .pipe(gulp.dest(path.BUILD_CSS));    

    return watch(path.LESS, function(){
        gulp.src(path.LESS)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(concat(path.OUT_CSS))
        .pipe(gulp.dest(path.BUILD_CSS)).pipe(connect.reload());;       
    });
});

gulp.task('build-less', function() {
  return gulp.src(path.LESS)
    .pipe(less())
    .pipe(concat(path.OUT_CSS))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.DIST_CSS));    
});

gulp.task('build-static', function() {
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DIST));
  gulp.src(path.STATIC)
    .pipe(gulp.dest(path.DIST_STATIC));
});

gulp.task('dev-server', function() {
  connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('prod-server', function() {
  connect.server({
    root: 'dist'
  });
});

gulp.task('default', ['watch-js', 'watch-less', 'dev-server']); 
gulp.task('build', ['build-js', 'build-less', 'build-static']);
