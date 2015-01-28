/**
 * Markup tasks
 *
 * 'markup:all' when all html files need to be processed.
 * 'markup:changed' when only the main files changed.
 *
 * Process html files.
 * Copy them to dist folder.
 * Reload connection.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var gulpif = require('gulp-if');

var browserSync = require('browser-sync');

var newer = require('gulp-newer');
var preprocess = require('gulp-preprocess');

function process(changed) {
	return gulp.src(config.src + '/*.html', {
			base: config.src
		})
		.pipe(gulpif(changed, newer(config.dist)))
		.pipe(preprocess({
			context: {
				NODE_ENV: 'dev',
				UA: config.analyticsUA
			}
		}))
		.pipe(gulp.dest(config.dist))
		.on('end', function() {
			browserSync.reload()
		});
};

gulp.task('markup:changed', function() {
	return process(true);
});

gulp.task('markup:all', function() {
	return process();
});
