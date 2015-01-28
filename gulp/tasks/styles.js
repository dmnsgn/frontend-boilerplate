/**
 * Styles tasks
 *
 * 'styles' compile sass files with sourcemaps.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var handleErrors = require('../utils/handleErrors');

var browserSync = require('browser-sync');

var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var filter = require('gulp-filter');
var size = require('gulp-size');

gulp.task('styles', function() {
	return sass(config.src + '/styles/main.scss', {
			sourcemap: true
		})
		.on('error', handleErrors)
		.pipe(autoprefixer('last 2 version'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dist + '/styles'))
		.pipe(filter('**/*.css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});
