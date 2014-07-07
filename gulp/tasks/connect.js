/**
 * Connect task
 *
 * Creates a server with dist folder as root and livereload enabled
 *
 */

var config = require('../config');
var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		root: config.dist,
		port: config.port,
		livereload: true
	});
});
