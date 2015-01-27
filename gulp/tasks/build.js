/**
 * Build task
 *
 * Basically build all assets, optimize them (size & usage).
 * Add some copyright stuffs.
 *
 */

var config = require('../config');
var handleErrors = require('../utils/handleErrors');
var gulp = require('gulp');
var gulpif = require('gulp-if');

var del = require('del');
var runSequence = require('run-sequence');

var header = require('gulp-header');
var rename = require('gulp-rename');
var filter = require('gulp-filter');
var size = require('gulp-size');

var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var sitemap = require('gulp-sitemap');

var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var cmq = require('gulp-combine-media-queries');

gulp.task('build', function() {

	return runSequence('scripts', ['build:markup', 'build:styles']);

});

/**
 * Build markup
 *
 * Markup tasks, change building blocks
 *
 */

gulp.task('build:markup', function() {
	gulp.start('build:markup:sitemap');

	var assets = useref.assets();
	return gulp.src(config.dist + '/*.html')
		.pipe(assets)
		.on('error', handleErrors)
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest(config.dist));
});

gulp.task('build:markup:sitemap', function() {
	var isUrlDefinned = (typeof config.prodUrl === 'string' && config.prodUrl !== '') ? true : false;

	if (isUrlDefinned) {
		return gulp.src(config.dist + '/*.html').pipe(sitemap({
				fileName: 'sitemap.xml',
				siteUrl: config.prodUrl
			}))
			.pipe(gulp.dest(config.dist));
	}
});

/**
 * Build styles
 *
 * Styles task, autoprefix for prod, minify, prepend header, output .min
 * Output file size.
 *
 */

gulp.task('build:styles', function() {
	return gulp.src(config.dist + '/styles/main.css')
		.pipe(autoprefixer(config.browsers, {
			cascade: false
		}))
		.pipe(cmq({
			log: config.verbose
		}))
		.pipe(minifyCss({
			keepSpecialComments: 1
		}))
		.pipe(header(config.banner))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(config.dist + '/styles'))
		.pipe(size({
			title: 'Main styles minified size'
		}));
});
