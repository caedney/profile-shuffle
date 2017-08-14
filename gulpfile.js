/* File: gulpfile.js */

//
// Require gulp packages
//
var autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    runSequence = require('run-sequence'),
    gulp = require('gulp');

//
// SASS
//
var outputStyles = ['nested', 'compact', 'expanded', 'compressed'];
var sassOptions = {
    errLogToConsole: true,
    outputStyle: outputStyles[2]
};
var autoprefixerOptions = {
    browsers: ['> 1%', 'last 4 versions', 'Firefox ESR', 'Opera 12.1'],
    cascade: false
};

gulp.task('sass', function() {
    return gulp
        .src('src/scss/main.scss')
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(gulp.dest('./dist/css'));
});

//
// JS
//
gulp.task('js', function() {
    return gulp
        .src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify({
            compress: true
        }))
        .pipe(gulp.dest('./dist/js'));
});

//
// BUILD PROJECT
// 
gulp.task('build-project', function() {
    runSequence(
        'sass',
        'js'
    );
});

//
// WATCH PROJECT
//
gulp.task('watch-project', function() {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/*.js', ['js']);
});

//
// PROJECT
//
gulp.task('project', function() {
    runSequence(
        'build-project',
        'watch-project'
    );
});
