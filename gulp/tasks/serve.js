/**
 * Serve task
 *
 * Serve dist directory
 * Log url to access from external devices (such as smartphone on the same network)
 * Log when device connect
 *
 */

var config = require('../config');
var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve', function() {

	var logLevel = config.verbose ? 'debug' : 'info';

	browserSync({
		server: {
			baseDir: config.dist,
			directory: true
		},
		port: config.port,
		logConnections: true,
		logLevel: logLevel
	});
});
