/**
 *  Default task
 *
 * All the magic begins here:
 * - create a simple server with livereload
 * - serve to localhost
 * - copy non-processed files to dist folder
 * - watch changes in source folder
 *
 */

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('default', ['connect', 'copy'], function() {
	// Serve
	gulp.start('serve');

	// Watch changes
	gulp.start('watch');

	gutil.log(gutil.colors.bgGreen('Default task started. Watching changes...'));
});
