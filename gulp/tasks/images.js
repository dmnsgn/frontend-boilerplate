/**
 * Images tasks
 *
 * 'images:optimization' optimize new images added to images folder (except sprite folder) and cache them.
 * 'images:spritesheet' create a spritesheet from images located in config.src/images/sprite folder.
 * 'images:favicon' generate favicons
 *
 */

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');

var newer = require('gulp-newer');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

var spritesmith = require('gulp.spritesmith');

var favicons = require('favicons');

gulp.task('images', ['images:optimization', 'images:spritesheet']);

gulp.task('images:optimization', function() {
	return gulp.src([config.src + '/images/**/*', '!' + config.src + '/images/{sprite,sprite/**}'])
		.pipe(newer(config.dist + '/images'))
		.pipe(cache(imagemin({
			progressive: true,
			interlaced: true,
			use: [pngcrush()]
		})))
		.pipe(gulp.dest(config.dist + '/images'));
});

gulp.task('images:spritesheet', function() {
	var spriteData = gulp.src(config.src + '/images/sprite/*.png').pipe(spritesmith({
		cssFormat: 'scss',
		imgName: '../images/sprite.png',
		cssName: '_sprite.scss',
		algorithm: 'binary-tree'
	}));
	spriteData.on('finish', function() {
		gutil.log(gutil.colors.bgYellow('Spritesmith ready to process....'));
	});
	spriteData.css.pipe(gulp.dest(config.src + '/styles/')).on('end', function() {
		gutil.log(gutil.colors.bgYellow('_sprite.scss file written...'));
	});
	return spriteData.img.pipe(gulp.dest(config.dist + '/images/')).on('end', function() {
		gutil.log(gutil.colors.bgGreen('Spritesheet generated.'));
	});
});

gulp.task('images:favicons', function() {
	return favicons({
		// I/O
		source: config.src + '/favicon.png',
		dest: config.dist + '/images/favicon',

		// Icon Types
		android: true,
		apple: true,
		coast: true,
		favicons: true,
		firefox: true,
		windows: true,

		// Miscellaneous
		html: config.src + '/index.html',
		background: '#1d1d1d',
		tileBlackWhite: true,
		manifest: null,
		trueColor: false,
		logging: config.verbose,
		callback: function() {
			gutil.log(gutil.colors.bgGreen('Favicons created.'));
		}
	});
});
