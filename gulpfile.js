const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const gutil = require('gulp-util');
const del = require('del');

gulp.task('dev', ['clean:build'], function () {
  // set up the browserify instance on a task basis
  const b = browserify({
    entries: './datepicker.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('datepicker.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
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

  return b.bundle()
    .pipe(source('datepicker.min.js'))
    .pipe(buffer())
    .pipe(uglify())
      .on('error', gutil.log)
    .pipe(gulp.dest('./build/'));
});

gulp.task('clean:build', function () {
  return del([
    'build/**/*',
    '!build/.gitignore'
  ]);
});
