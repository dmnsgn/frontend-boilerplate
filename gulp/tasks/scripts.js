/**
 * Scripts task
 *
 * 'scripts:native' jshint.
 * 'scripts:coffee' coffeelint, compile coffee files.
 *
 */

var config = require('../config');
var handleErrors = require('../utils/handleErrors');
var gulp = require('gulp');

var browserSync = require('browser-sync');

var jshint = require('gulp-jshint');
var coffee = require('gulp-coffee');
var coffeelint = require('gulp-coffeelint');
var size = require('gulp-size');

gulp.task('scripts', ['scripts:native', 'scripts:coffee']);

gulp.task('scripts:native', function() {
	return gulp.src(config.src + '/scripts/**/*.js')
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter('jshint-stylish'))
		.pipe(gulp.dest(config.dist + '/scripts'))
		.on('end', function() {
			browserSync.reload();
		})
		.pipe(size({
			title: 'Script size'
		}));
});

gulp.task('scripts:coffee', function() {
	return gulp.src(config.src + '/scripts/**/*.coffee')
		.pipe(coffeelint())
		.pipe(coffeelint.reporter())
		.on('error', handleErrors)
		.pipe(coffee({
			bare: true
		}))
		.on('error', handleErrors)
		.pipe(gulp.dest(config.dist + '/scripts'))
		.on('end', function() {
			browserSync.reload();
		})
		.pipe(size({
			title: 'Coffee file compiled size'
		}));
});
