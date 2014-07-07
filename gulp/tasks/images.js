/**
 * Images tasks
 *
 * Optimize new images added to images folder (except sprite folder) and cache them.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var newer = require('gulp-newer');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

gulp.task('images', function() {
	return gulp.src([config.src + '/images/**/*', '!' + config.src + '/images/{sprite,sprite/**}'])
		.pipe(newer(config.dist + '/images'))
		.pipe(cache(imagemin({
			progressive: true,
			interlaced: true,
			use: [pngcrush()]
		})))
		.pipe(gulp.dest(config.dist + '/images'));
});
