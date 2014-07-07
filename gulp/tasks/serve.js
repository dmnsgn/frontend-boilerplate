/**
 * Serve task
 *
 * Serve file in dist folder in default browser.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var opn = require('opn');

gulp.task('serve', function() {
	opn('http://localhost:' + config.port);
});
