var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var watch = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var concat = require('gulp-concat');

var path = {
    REACT_ENTRIES: [
        './src/js/root.js' //Add more entry points here if you are adding more apps
    ],
    OUT_JS: 'build.js',
    DEST_JS: 'src/js',
    LESS: 'src/css/less/*.less',
    OUT_CSS: 'build.css',
    DEST_CSS: 'src/css'
};

gulp.task('watch-js', function() {
    var bundler = browserify({
        entries: path.REACT_ENTRIES, 
        transform: [reactify], 
        debug: true, 
        cache: {}, packageCache: {}, fullPaths: true 
    });
    var watcher  = watchify(bundler);

    return watcher
    .on('update', function () {
        watcher.bundle()
        .pipe(source(path.OUT_JS))
        .pipe(gulp.dest(path.DEST_JS));
    })
    .bundle()
    .pipe(source(path.OUT_JS))
    .pipe(gulp.dest(path.DEST_JS));
});

gulp.task('build-js', function(){
    browserify({
        entries: path.REACT_ENTRIES,
        transform: [reactify]
    })
    .bundle()
    .pipe(source(path.OUT_JS))
    .pipe(streamify(uglify(path.OUT_JS)))
    .pipe(gulp.dest(path.DEST_JS));
});


gulp.task('watch-less', function () {
    gulp.src(path.LESS)
        .pipe(sourcemaps.init()) 
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(concat(path.OUT_CSS))
        .pipe(gulp.dest(path.DEST_CSS));    

    return watch(path.LESS, function(){
        gulp.src(path.LESS)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(concat(path.OUT_CSS))
        .pipe(gulp.dest(path.DEST_CSS));       
    });
});

gulp.task('build-less', function() {
  return gulp.src(path.LESS)
    .pipe(less())
    .pipe(concat(path.OUT_CSS))
    .pipe(minifyCSS())
    .pipe(gulp.dest(path.DEST_CSS));    
});


gulp.task('default', ['watch-js', 'watch-less']); 
gulp.task('build', ['build-js', 'build-less']);
