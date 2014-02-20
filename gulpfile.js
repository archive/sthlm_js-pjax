var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', ['js', 'sass'], function(){
  // place code for your default task here
});

var sass = require('gulp-ruby-sass');
gulp.task('sass', function () {
    gulp.src('./src/public/styles/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/public/output'));
});

var browserify = require('gulp-browserify');
gulp.task('browserify', function() {
    gulp.src('./src/public/scripts/app.js')
        .pipe(browserify())
        .pipe(gulp.dest('./src/public/output'))
});

gulp.task('watch', function () {
  gulp.watch('src/public/scripts/**/*.js', ['browserify']);
  gulp.watch('src/public/styles/**/*.scss', ['sass']);
});

var jshint = require('gulp-jshint');
gulp.task('jshint', function() {
  gulp.src('src/public/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

var csslint = require('gulp-csslint');
gulp.task('csslint', function() {
  gulp.src('./src/public/styles/app-imports.scss')
      .pipe(sass())
      .pipe(gulp.dest('./src/public/output'));
  gulp.src('src/public/output/app-imports.css')
    .pipe(csslint('.csslintrc'))
    .pipe(csslint.reporter());
});