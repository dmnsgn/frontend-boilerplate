/**
 * Watch task
 *
 * Watch all changes in source folder and launch task accordingly
 *
 */

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');

var watch = require('gulp-watch');

// function onWatchChange(event) {
// 	gutil.log(gutil.colors.gray('File ' + event.path + ' was ' + event.type + ', running tasks...'));
// }

gulp.task('watch', function() {

	// Watch html files
	watch(config.src + '/*.html', {
		emitOnGlob: false,
		read: false,
		name: 'Html watcher',
		verbose: config.verbose
	}, function() {
		gulp.start('markup:changed');
	});

	watch(config.src + '/templates/**/*', {
		emitOnGlob: false,
		read: false,
		name: 'Templates watcher',
		verbose: config.verbose
	}, function() {
		gulp.start('markup:all');
	});

	// Watch bower dependencies
	watch('bower.json', {
		emitOnGlob: false,
		read: false,
		name: 'Bower dependencies watcher',
		verbose: config.verbose
	}, function() {
		gulp.start('markup:all');
		gulp.start('styles:wiredep');
	});

	// Watch .scss files
	watch(config.src + '/styles/**/*.scss', {
		emitOnGlob: false,
		read: false,
		name: 'Scss watcher',
		verbose: config.verbose
	}, function() {
		gulp.start('styles:sass');
	});

	// Watch .js files
	watch(config.src + '/scripts/**/*.js', {
		emitOnGlob: false,
		read: false,
		name: 'Js watcher',
		verbose: config.verbose
	}, function() {
		gulp.start('scripts:native');
	});

	// Watch .coffee files
	watch(config.src + '/scripts/**/*.coffee', {
		emitOnGlob: false,
		read: false,
		name: 'Coffee watcher',
		verbose: config.verbose
	}, function() {
		gulp.start('scripts:coffee');
	});

	// Watch test files
	watch(config.test + '/**/*.js', {
		emitOnGlob: false,
		read: false,
		name: 'Test watcher',
		verbose: config.verbose
	}, function() {
		gulp.start('test:scripts');
	});

	// Watch images files
	watch(config.src + '/images/**/*', {
		emitOnGlob: false,
		read: false,
		name: 'Images watcher',
		verbose: config.verbose
	}, function() {
		gulp.start('images:optimization');
	});
	watch(config.src + '/images/sprite/**/*', {
		emitOnGlob: false,
		read: false,
		name: 'Spritesheet watcher',
		verbose: config.verbose
	}, function() {
		gulp.start('images:spritesheet');
	});


	// TODO: waiting for https://github.com/shama/gaze/issues/56 to be resolved
	// Watch html files
	// gulp.watch(config.src + '/*.html', ['markup:changed']).on('change', onWatchChange);
	// gulp.watch(config.src + '/inc/**/*', ['markup:all']).on('change', onWatchChange);

	// // Watch bower dependencies
	// gulp.watch('bower.json', ['markup:all', 'styles:wiredep']).on('change', onWatchChange);

	// // Watch .scss files
	// gulp.watch(config.src + '/styles/**/*.scss', ['styles']).on('change', onWatchChange);

	// // Watch .js files
	// gulp.watch(config.src + '/scripts/**/*.js', ['scripts']).on('change', onWatchChange);

	// // Watch .coffee files
	// gulp.watch(config.src + '/scripts/**/*.coffee', ['scripts:coffee']).on('change', onWatchChange);;

	// // Watch test files
	// gulp.watch(config.test + '/**', ['test:scripts']).on('change', onWatchChange);

	// // Watch images files
	// gulp.watch(config.src + '/images/**/*', ['images']).on('change', onWatchChange);
	// gulp.watch(config.src + '/images/sprite/**/*', ['images:spritesheet']).on('change', onWatchChange);

	gutil.log(gutil.colors.bgGreen('Watching changes...'));

});
