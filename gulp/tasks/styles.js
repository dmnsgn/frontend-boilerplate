/**
 * Styles tasks
 *
 * 'styles:sass' compile sass files.
 * 'styles:wiredep' adds bower dependency directly to the main scss file.
 * 'styles:fonts' copy fonts files from src and bower packages into dist folder.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var handleErrors = require('../utils/handleErrors');

var runSequence = require('run-sequence');

var browserSync = require('browser-sync');

var sass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');

var autoprefixer = require('gulp-autoprefixer');

var wiredep = require('wiredep').stream;

var filter = require('gulp-filter');
var flatten = require('gulp-flatten');

var size = require('gulp-size');

gulp.task('styles', function() {

	runSequence(['styles:wiredep', 'styles:fonts'], 'styles:sass');

});

gulp.task('styles:sass', function() {
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

gulp.task('styles:wiredep', function() {
	return gulp.src(config.src + '/styles/*.scss')
		.pipe(wiredep({
			directory: config.bower
		}))
		.pipe(gulp.dest(config.src + '/styles/'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('styles:fonts', function() {
	return gulp.src(require('main-bower-files')().concat(config.src + '/styles/fonts/**/*'))
		.pipe(filter('**/*.{eot,svg,ttf,woff}'))
		.pipe(flatten())
		.pipe(gulp.dest(config.dist + '/styles/fonts'));
});
