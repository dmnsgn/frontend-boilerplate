import fs from 'fs';

import gulp from 'gulp';
import pngquant from 'imagemin-pngquant';

import chalk from 'chalk';
import newer from 'gulp-newer';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import spritesmith from 'gulp.spritesmith';
import favicons from 'gulp-favicons';

import config from '../config';
import pkg from '../../package.json';

export function optimizeImages() {
  return gulp.src([`${config.src}/images/**/*`, `!${config.src}/images/{sprite,sprite/**}`])
    .pipe(newer(config.dist + '/images'))
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true,
      use: [pngquant()]
    })))
    .pipe(gulp.dest(`${config.dist}/images`));
}

export function generateSpritesheet() {
  let spriteData = gulp.src(`${config.src}/images/sprite/*.png`).pipe(spritesmith({
    retinaSrcFilter: [`${config.src}/images/sprite/*@2x.png`],
    retinaImgName: 'sprite@2x.png',
    imgName: '../images/sprite.png',
    cssName: `_sprite.${config.extensions.styles}`,
    algorithm: 'binary-tree'
  }));
  spriteData.on('finish', function() {
    console.log(chalk.yellow('Spritesheet ready to process....'));
  });
  spriteData.on('error', function(err) {
    console.log(chalk.red('Spritesheet ', err));
  });
  spriteData.css.pipe(gulp.dest(`${config.src}/styles/`)).on('end', function() {
    console.log(chalk.green('Spritesheet _sprite file written...'));
  });
  return spriteData.img.pipe(gulp.dest(`${config.dist}/images/`)).on('end', function() {
    console.log(chalk.green('Spritesheet generated.'));
  });
}

export function generateFavicons(done) {
  done();
  return;
  // fs.writeFileSync(`${config.src}/inc/_favicons.html`, '<link rel="favicons" href="..." />');

  // return gulp.src(`${config.src}/inc/_favicons.html`)
  //   .pipe(favicons({
  //     files: {
  //       src: `${config.src}/favicon.png`,
  //       dest: `../../${config.dist}/images/favicon`,
  //       iconsPath: 'images/favicon'
  //     },
  //     settings: {
  //       appName: config.title,
  //       appDescription: config.description,
  //       developer: config.author,
  //       developerURL: config.developerURL,
  //       background: 'transparent',
  //       index: 'index.html',
  //       url: config.prodURL,
  //       logging: config.verbose
  //     }
  //   }, function(err) {
  //     console.log(err)
  //   }));

}
