/**
 * Watch task
 *
 * Watch all changes in source folder and launch task accordingly
 *
 */

var config = require('../config');
var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('watch', function() {
	// Watch html files
	watch({
		glob: config.src + '/*.html',
		name: 'Html watcher',
		verbose: config.verbose
	}, ['markup']);

	// Watch .scss files
	watch({
		glob: config.src + '/styles/**/*.scss',
		name: 'Sass watcher',
		verbose: config.verbose
	}, ['styles']);

	// Watch .js files
	watch({
		glob: config.src + '/scripts/**/*.js',
		name: 'Scripts watcher',
		verbose: config.verbose
	}, ['scripts']);

	// Watch image files
	watch({
		glob: config.src + '/images/**/*',
		name: 'Images watcher',
		verbose: config.verbose
	}, ['images']);
	watch({
		glob: config.src + '/images/sprite/**/*',
		name: 'Spritesheet watcher',
		verbose: config.verbose
	}, ['spritesheet']);

});
