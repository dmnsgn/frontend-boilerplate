/**
 * Test task
 *
 * 'test:markup' validate w3c.
 * 'test:scripts' run mocha tests.
 * 'test:psi' PageSpeed Insights reportings.
 *
 */

import handleErrors from '../utils/handleErrors';

import gutil from 'gulp-util';

import w3cjs from 'gulp-w3cjs';
import mocha from 'gulp-mocha';

import psi from 'psi';

gulp.task('test', ['test:markup', 'test:scripts'], function() {
	gutil.log(gutil.colors.bgGreen('Test task completed.'));
});

gulp.task('test:markup', function() {
	return gulp.src(`${config.dist}/*.html`)
		.pipe(w3cjs());
});

gulp.task('test:scripts', function() {
	return gulp.src(`${config.test}/*.js`, {
			read: false
		})
		.pipe(mocha({
			reporter: 'progress'
		}))
		.on('error', handleErrors);
});

// https://github.com/addyosmani/psi-gulp-sample/blob/master/gulpfile.js
//
// Please feel free to use the `nokey` option to try out PageSpeed
// Insights as part of your build process. For more frequent use,
// we recommend registering for your own API key. For more info:
// https://developers.google.com/speed/docs/insights/v1/getting_started

gulp.task('test:psi', ['test:psi:mobile', 'test:psi:desktop']);

gulp.task('test:psi:mobile', function(cb) {
	psi({
		// key: key
		nokey: 'true',
		url: config.prodUrl,
		strategy: 'mobile',
	}, cb);
});

gulp.task('test:psi:desktop', function(cb) {
	psi({
		// key: key,
		nokey: 'true',
		url: config.prodUrl,
		strategy: 'desktop',
	}, cb);
});
