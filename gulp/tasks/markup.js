/**
 * Markup task
 *
 * Copy html files to dist folder.
 * Reload connection.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var preprocess = require('gulp-preprocess');
var connect = require('gulp-connect');

gulp.task('markup', function() {
	return gulp.src(config.src + '/*.html')
		.pipe(preprocess({
			context: {
				NODE_ENV: 'dev'
			}
		}))
		.pipe(gulp.dest(config.dist))
		.pipe(connect.reload());
});
