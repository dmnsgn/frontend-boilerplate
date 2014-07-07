/**
 * Copy task
 *
 * Copy files added in config with the same structure as in source folder.
 *
 */

var config = require('../config');
var gulp = require('gulp');

gulp.task('copy', function() {
	return gulp.src(config.copyFiles, {
			base: './' + config.src
		})
		.pipe(gulp.dest(config.dist));
});
