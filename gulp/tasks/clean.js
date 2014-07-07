/**
 * Clean task
 *
 * Clean dist folder, gulp all caches and sass cache
 *
 */

var config = require('../config');
var gulp = require('gulp');
var del = require('del');

gulp.task('clean', ['clearCache'], function(cb) {
	del([config.dist + '/*', '.gitkeep', '.sass-cache'], cb);
});
