const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const del = require('del');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const scss = require('postcss-scss');
const nested = require('postcss-nested');

gulp.task('js-dev', ['clean:build'], function () {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: './datepicker.js',
    debug: true
  });

  return b.transform('babelify', { presets: [ 'es2015' ]})
    .bundle()
    .pipe(source('datepicker.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', ['clean:build'], function () {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: './datepicker.js',
    debug: true
  });

  return b.transform('babelify', { presets: [ 'es2015' ]})
    .bundle()
    .pipe(source('datepicker.min.js'))
    .pipe(buffer())
    .pipe(uglify())
      .on('error', gutil.log)
    .pipe(gulp.dest('./build/'));
});

gulp.task('scss', function () {
  var processors = [
    nested,
    autoprefixer({browsers: ['last 1 version']})
  ];
  return gulp.src('./scss/datepicker.scss')
    .pipe(postcss(processors, { syntax: scss }))
    .pipe(gulp.dest('./build/css'));
});

gulp.task('clean:build', function () {
  return del([
    'build/**/*',
    '!build/.gitignore'
  ]);
});

gulp.task('default', ['js-dev', 'scss']);
