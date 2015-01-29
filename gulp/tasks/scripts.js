/**
 * Scripts task
 *
 * Bundle scripts/templates with browserify
 *
 */

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserSync = require('browser-sync');
var browserify = require('browserify');
var watchify = require('watchify');

var uglify = require('gulp-uglify');
var header = require('gulp-header');
var rename = require('gulp-rename');

var bundleLogger = require('../utils/bundleLogger');
var handleErrors = require('../utils/handleErrors');

gulp.task('scripts', function(callback) {

	var b = browserify({
		cache: {},
		packageCache: {},
		fullPaths: true,
		entries: ['./' + config.src + '/scripts/main.coffee'],
		extensions: ['.coffee', '.hbs'],
		debug: global.isWatching
	});

	var bundler = global.isWatching ? watchify(b) : b;

	var bundle = function() {

		bundleLogger.start();

		return bundler
			.bundle()
			.on('error', handleErrors)
			.pipe(source('main.js'))
			.pipe(buffer())
			.pipe(global.isWatching ? gutil.noop() : uglify())
			.pipe(global.isWatching ? gutil.noop() : header(config.banner))
			.pipe(global.isWatching ? gutil.noop() : rename({
				suffix: '.min'
			}))
			.pipe(gulp.dest('./' + config.dist + '/scripts'))
			.on('end', function() {
				if (global.isWatching) {
					browserSync.reload();
				}
				bundleLogger.end();
			})
	};

	if (global.isWatching) {
		bundler.on('update', bundle);
	}

	return bundle();

});
