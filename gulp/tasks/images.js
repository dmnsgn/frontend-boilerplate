/**
 * Images tasks
 *
 * 'images:optimization' optimize new images added to images folder (except sprite folder) and cache them.
 * 'images:spritesheet' create a spritesheet from images located in config.src/images/sprite folder.
 * 'images:favicon' generate favicons
 *
 */

var fs = require('fs');

var pkg = require('../../package.json');
var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');

var newer = require('gulp-newer');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var pngcrush = require('imagemin-pngcrush');

var spritesmith = require('gulp.spritesmith');

var favicons = require('favicons');

gulp.task('images', ['images:optimization', 'images:spritesheet'/*, 'images:favicons'*/]);

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
		gutil.log(gutil.colors.yellow('Spritesmith ready to process....'));
	});
	spriteData.css.pipe(gulp.dest(config.src + '/styles/')).on('end', function() {
		gutil.log(gutil.colors.yellow('_sprite.scss file written...'));
	});
	return spriteData.img.pipe(gulp.dest(config.dist + '/images/')).on('end', function() {
		gutil.log(gutil.colors.green('Spritesheet generated.'));
	});
});

/*gulp.task('images:favicons', function() {

	return favicons({
		files: {
			src: config.src + '/favicon.png',
			dest: config.dist + '/images/favicon',
			html: config.src + '/inc/_favicons.html',
			iconsPath: 'images/favicon'
		},
		settings: {
			appName: pkg.name,
			appDescription: pkg.description,
			developer: pkg.author,
			developerURL: config.developerURL,
			background: 'transparent',
			index: 'index.html',
			url: config.prodUrl,
			logging: true
		}
	}, function(err) {
		if (err) throw err;
	});

});*/
