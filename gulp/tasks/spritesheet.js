/**
 * Spritesheet task
 *
 * Create a spritesheet from images located in images/sprite folder.
 * Reload connection.
 *
 */

var config = require('../config');
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
var connect = require('gulp-connect');

gulp.task('spritesheet', function() {
	var spriteData = gulp.src(config.src + '/images/sprite/*.png').pipe(spritesmith({
		cssFormat: 'scss',
		imgName: '../images/sprite.png',
		cssName: '_sprite.scss',
		algorithm: 'binary-tree'
	}));
	spriteData.img.pipe(gulp.dest(config.dist + '/images/'));
	spriteData.css.pipe(gulp.dest(config.src + '/styles/'))
		.pipe(connect.reload());
});
