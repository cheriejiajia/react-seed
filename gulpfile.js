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
var jshint = require('gulp-jshint');
var jsxhint = require('jshint-jsx');
var stylish = require('jshint-stylish');

var path = {
  REACT_ENTRIES: [
  './src/js/root.js'
  ],
  LESS: 'src/css/less/*.less',
  HTML: 'src/index.html',
  STATIC: 'src/static/**/*',
  JS: 'src/js/**/*.js',

  BUILD_JS: 'build.js',
  BUILD_CSS: 'build.css',
  BUILD_HTML: 'index.html',

  JS_DIR: 'src/js/',
  CSS_DIR: 'src/css/',

  DIST: 'dist/',
  DIST_JS: 'dist/js/',
  DIST_CSS: 'dist/css/',
  DIST_STATIC: 'dist/static/'
};

function jsLint() {
  gulp.src([path.JS, '!' + path.JS_DIR + path.BUILD_JS])
  .pipe(jshint({ linter: jsxhint.JSXHINT }))
  .pipe(jshint.reporter(stylish));
}

gulp.task('watch-js', function() {
  var bundler = browserify({
    entries: path.REACT_ENTRIES,
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }).transform("babelify", {presets: ["es2015", "react"]});

  var watcher  = watchify(bundler);

  return watcher.on('update', function () {
    jsLint();

    watcher.bundle()
    .pipe(source(path.BUILD_JS))
    .pipe(gulp.dest(path.JS_DIR)).pipe(connect.reload());
  })
  .bundle()
  .pipe(source(path.BUILD_JS))
  .pipe(gulp.dest(path.JS_DIR));
});

gulp.task('build-js', function(){
  browserify({
    entries: path.REACT_ENTRIES
  })
  .transform("babelify", {presets: ["es2015", "react"]})
  .bundle()
  .pipe(source(path.BUILD_JS))
  .pipe(streamify(uglify(path.BUILD_JS)))
  .pipe(gulp.dest(path.DIST_JS));
});


gulp.task('watch-less', function () {
  gulp.src(path.LESS)
  .pipe(sourcemaps.init())
  .pipe(less())
  .pipe(sourcemaps.write())
  .pipe(concat(path.BUILD_CSS))
  .pipe(gulp.dest(path.CSS_DIR));

  return watch(path.LESS, function(){
    gulp.src(path.LESS)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write())
    .pipe(concat(path.BUILD_CSS))
    .pipe(gulp.dest(path.CSS_DIR)).pipe(connect.reload());;
  });
});

gulp.task('build-less', function() {
  return gulp.src(path.LESS)
  .pipe(less())
  .pipe(concat(path.BUILD_CSS))
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

gulp.task('lint', jsLint);

gulp.task('default', ['watch-js', 'watch-less', 'dev-server']);
gulp.task('build', ['build-js', 'build-less', 'build-static']);
