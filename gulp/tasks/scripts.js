/**
 * Scripts task
 *
 * Concat files in order
 * Provide a styled jshint output.
 * Reload connection.
 * Output file size.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var excludeFiles = require('../utils/excludeFiles');

var order = require('gulp-order');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var size = require('gulp-size');

gulp.task('scripts', function() {
	return gulp.src(excludeFiles([config.src + '/scripts/**/*.js'], config.copyFiles))
		.pipe(order([
			'vendor/**/*.js',
			'plugins/**/*.js',
			'debug/**/*.js',
			'*.js',
			'main.js'
		]))
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(concat('main.js'))
		.pipe(gulp.dest(config.dist + '/scripts'))
		.pipe(connect.reload())
		.pipe(size({
			title: 'Main script size'
		}));
});
