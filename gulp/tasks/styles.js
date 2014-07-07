/**
 * Styles task
 *
 * Compile sass files.
 * Autoprefix css for development
 * Reload connection.
 * Output file size.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var handleErrors = require('../utils/handleErrors');

var rubySass = require('gulp-ruby-sass');
var connect = require('gulp-connect');
var size = require('gulp-size');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
	return gulp.src(config.src + '/styles/main.scss')
		.pipe(rubySass())
		.on('error', handleErrors)
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest(config.dist + '/styles/'))
		.pipe(connect.reload())
		.pipe(size({
			title: 'Main styles size'
		}));
});
