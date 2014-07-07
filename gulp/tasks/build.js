/**
 * Build task
 *
 * Basically build all assets, optimize them (size & usage).
 * Add some copyright stuffs.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');

var header = require('gulp-header');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var size = require('gulp-size');

var preprocess = require('gulp-preprocess');

var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var cmq = require('gulp-combine-media-queries');

var uglify = require('gulp-uglify');

gulp.task('build', ['buildTemplates', 'buildAssets', 'buildStyles', 'buildScripts'], function() {
	connect.reload();
	gutil.log(gutil.colors.bgGreen('Build task completed.'));
});

/**
 * Build templates
 *
 * Markup tasks, change building blocks
 */

gulp.task('buildTemplates', function() {
	return gulp.src(config.src + '/*.html')
		.pipe(preprocess({
			context: {
				NODE_ENV: 'build'
			}
		}))
		.pipe(gulp.dest(config.dist));
});

/**
 * Build assets
 *
 * Images & spritesheet tasks
 *
 */

gulp.task('buildAssets', ['images', 'spritesheet']);

/**
 * Build styles
 *
 * Styles task, autoprefix for prod, minify, prepend header, output .min
 * Output file size.
 *
 */

gulp.task('buildStyles', ['styles'], function() {
	return gulp.src(config.dist + '/styles/main.css')
		.pipe(autoprefixer(config.autoprefixer, {
			cascade: false
		}))
		.pipe(cmq({
			log: config.verbose
		}))
		.pipe(minifyCss())
		.pipe(header(config.banner))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(config.dist + '/styles'))
		.pipe(size({
			title: 'Main styles minified size'
		}));
});

/**
 * Build scripts
 *
 * Script task, uglify, prepend header, output .min
 * Output file size.
 *
 */

gulp.task('buildScripts', ['scripts'], function() {
	return gulp.src(config.dist + '/scripts/main.js')
		.pipe(uglify())
		.pipe(header(config.banner))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(config.dist + '/scripts'))
		.pipe(size({
			title: 'Main scripts minified size'
		}));
});
