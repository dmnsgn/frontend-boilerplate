/**
 * Images tasks
 *
 * 'images:optimization' optimize new images added to images folder (except sprite folder) and cache them.
 * 'images:spritesheet' create a spritesheet from images located in config.src/images/sprite folder.
 * 'images:favicon' generate favicons
 *
 */

var fs = require('fs');

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');

var newer = require('gulp-newer');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

var spritesmith = require('gulp.spritesmith');

var favicons = require('favicons');

gulp.task('images', ['images:optimization', 'images:spritesheet', 'images:favicons']);

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
		opengraph: true,
		windows: true,

		// Miscellaneous
		html: null,
		background: 'transparent',
		tileBlackWhite: false,
		manifest: config.dist + '/manifest.webapp',
		trueColor: false,
		url: config.prodUrl,
		logging: config.verbose,
		callback: function(status, html) {
			var that = this;
			// Correct path in html
			var hrefRe = new RegExp(config.dist + '/', 'g');
			var metas = html.replace(hrefRe, '').replace(/content="dist\//g, 'content="images/favicon/');
			fs.writeFile(config.src + '/templates/_favicons.html', metas, function(err) {
				if (err) {
					console.log(err);
				} else {
					// Correct path in manifest
					fs.readFile(that.manifest, 'utf8', function(err, data) {
						if (err) {
							return console.log(err);
						}
						var result = data.replace(/firefox-icon/g, 'images/favicon/firefox-icon');

						fs.writeFile(that.manifest, result, 'utf8', function(err) {
							if (err) {
								return console.log(err);
							} else {
								gutil.log(gutil.colors.bgGreen(status));
							}
						});
					});
				}
			});
		}
	});
});
