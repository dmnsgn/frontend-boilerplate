/**
 * Clean task
 *
 * Clean dist folder, gulp all caches and sass cache
 *
 */

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');

var cache = require('gulp-cache');

gulp.task('clean', ['clean:clearCache', 'clean:deleteFiles']);

gulp.task('clean:deleteFiles', function() {
	del([config.dist + '/*', '.sass-cache']);
});

gulp.task('clean:clearCache', function() {
	cache.clearAll();
});
