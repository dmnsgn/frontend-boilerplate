/**
 * Scripts task
 *
 */

var config = require('../config');
var gulp = require('gulp');

var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');

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
			.pipe(gulp.dest('./' + config.dist + '/scripts'))
			.on('end', bundleLogger.end);
	};

	if (global.isWatching) {
		bundler.on('update', bundle);
	}

	return bundle();

});
