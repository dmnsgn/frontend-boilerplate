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

var rubySass = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');

var wiredep = require('wiredep').stream;

var filter = require('gulp-filter');
var flatten = require('gulp-flatten');

var size = require('gulp-size');

gulp.task('styles', function () {

	runSequence(['styles:wiredep', 'styles:fonts'], 'styles:sass');

});

gulp.task('styles:sass', function() {
	return gulp.src(config.src + '/styles/**/*.scss')
		.pipe(rubySass({
			style: 'compact',
			trace: config.verbose
		}))
		.on('error', handleErrors)
		.pipe(autoprefixer('last 2 version'))
		.pipe(gulp.dest(config.dist + '/styles/'))
		.pipe(size({
			title: 'Main styles size'
		}))
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

