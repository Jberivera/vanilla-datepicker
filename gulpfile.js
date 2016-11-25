const browserify = require('browserify');
const watchify = require('watchify');
const gulp = require('gulp');
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const del = require('del');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

gulp.task('build', [ 'clean:build', 'js', 'css' ], function () {
  runSequence(['build:js', 'build:css']);
});

gulp.task('build:js', function () {
  return gulp.src('./build/js/datepicker.js')
    .pipe(uglify())
      .on('error', gutil.log)
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('build:css', function () {
  const processors = [
    cssnano
  ];
  return gulp.src('./build/css/datepicker.css')
    .pipe(postcss(processors))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  const b = watchify(browserify({
    entries: './datepicker.js',
    debug: true
  }));

  return b.transform('babelify', { presets: [ 'es2015' ]})
    .bundle()
    .pipe(source('datepicker.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('css', function () {
  const processors = [
    autoprefixer({ browsers: ['last 1 version'] })
  ];
  return gulp.src('./scss/datepicker.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('clean:build', function () {
  return del([
    'build/**/*',
    '!build/.gitignore'
  ]);
});

gulp.task('default', ['clean:build', 'js', 'css'], function () {
  gulp.watch('./scss/**/*.scss', ['css']);
  gulp.watch('./js/**/*.js', ['js']);
  gulp.watch('./datepicker.js', ['js']);
});
