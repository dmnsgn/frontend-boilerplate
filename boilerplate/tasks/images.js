/**
 * Images tasks
 *
 * 'images:optimization' optimize new images added to images folder (except sprite folder) and cache them.
 * 'images:spritesheet' create a spritesheet from images located in config.src/images/sprite folder.
 * 'images:favicon' generate favicons
 *
 */

import gutil from 'gulp-util';

import newer from 'gulp-newer';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';

import spritesmith from 'gulp.spritesmith';

import favicons from 'gulp-favicons';

gulp.task('images', ['images:optimization', 'images:spritesheet' , 'images:favicons' ]);

gulp.task('images:optimization', function() {
  return gulp.src([`${config.src}/images/**/*`, `!${config.src}/images/{sprite,sprite/**}`])
    .pipe(newer(config.dist + '/images'))
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true,
      use: [pngquant()]
    })))
    .pipe(gulp.dest(`${config.dist}/images`));
});

gulp.task('images:spritesheet', function() {
  let spriteData = gulp.src(`${config.src}/images/sprite/*.png`).pipe(spritesmith({
    retinaSrcFilter: [`${config.src}/images/sprite/*@2x.png`],
    retinaImgName: 'sprite@2x.png',
    imgName: '../images/sprite.png',
    cssName: `_sprite.${pkg.extensions.styles}`,
    algorithm: 'binary-tree'
  }));
  spriteData.on('finish', function() {
    gutil.log(gutil.colors.yellow('Spritesmith ready to process....'));
  });
  spriteData.css.pipe(gulp.dest(`${config.src}/styles/`)).on('end', function() {
    gutil.log(gutil.colors.yellow('_sprite file written...'));
  });
  return spriteData.img.pipe(gulp.dest(`${config.dist}/images/`)).on('end', function() {
    gutil.log(gutil.colors.green('Spritesheet generated.'));
  });
});

gulp.task('images:favicons', function() {

  return gulp.src(`${config.src}/inc/_favicons.html`)
    .pipe(favicons({
      files: {
        src: `${config.src}/favicon.png`,
        dest: `../../${config.dist}/images/favicon`,
        iconsPath: 'images/favicon'
      },
      settings: {
        appName: pkg.title,
        appDescription: pkg.description,
        developer: pkg.author,
        developerURL: config.developerURL,
        background: 'transparent',
        index: 'index.html',
        url: config.prodUrl,
        logging: config.verbose
      }
    }, function(err) {
      console.log(err)
    }));

});
