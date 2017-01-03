import fs from 'fs';

import gulp from 'gulp';
import chalk from 'chalk';
import pngquant from 'imagemin-pngquant';
import favicons from 'favicons';
import mkdirp from 'mkdirp';

import newer from 'gulp-newer';
import cache from 'gulp-cache';
import imagemin from 'gulp-imagemin';
import spritesmith from 'gulp.spritesmith';

import config from '../config';

export function optimizeImages() {
  return gulp.src([`${config.src}/images/**/*`, `!${config.src}/images/{sprite,sprite/**}`])
    .pipe(newer(`${config.dist}/images`))
    .pipe(cache(imagemin({
      progressive: true,
      interlaced: true,
      use: [pngquant()]
    })))
    .pipe(gulp.dest(`${config.dist}/images`));
}

export function generateSpritesheet() {
  const spriteData = gulp.src(`${config.src}/images/sprite/*.png`).pipe(spritesmith({
    retinaSrcFilter: [`${config.src}/images/sprite/*@2x.png`],
    retinaImgName: '../images/sprite@2x.png',
    imgName: '../images/sprite.png',
    cssName: `_sprite.${config.extensions.styles}`,
    algorithm: 'binary-tree'
  }));
  spriteData.on('finish', () => {
    console.log(chalk.yellow('Spritesheet ready to process....'));
  });
  spriteData.on('error', (err) => {
    console.log(chalk.red('Spritesheet ', err));
  });
  spriteData.css.pipe(gulp.dest(`${config.src}/styles/`)).on('end', () => {
    console.log(chalk.green('Spritesheet _sprite file written...'));
  });
  return spriteData.img.pipe(gulp.dest(`${config.dist}/images/`)).on('end', () => {
    console.log(chalk.green('Spritesheet generated.'));
  });
}

export function generateFavicons(done) {
  return favicons(`${config.src}/favicon.png`, {
    appName: config.title,
    appDescription: config.description,
    developerName: config.author,
    developerURL: config.developerURL,
    background: 'transparent',
    path: 'images/favicon/',
    url: 'images/share.jpg',
    display: 'standalone',
    orientation: 'portrait',
    version: config.version,
    logging: config.verbose,
    online: false,
    icons: {
      android: true,
      appleIcon: true,
      appleStartup: true,
      coast: true,
      favicons: true,
      firefox: true,
      opengraph: false,
      twitter: false,
      windows: true,
      yandex: true
    }
  }, (error, response) => {
    if (error) {
      console.log(error.status);
      console.log(error.name);
      console.log(error.message);
    }

    const faviconFolder = `${config.dist}/images/favicon/`;

    if (response.images) {
      mkdirp.sync(faviconFolder);
      response.images.forEach((image) =>
        fs.writeFileSync(`${faviconFolder}${image.name}`, image.contents)
      );
    }

    if (response.files) {
      mkdirp.sync(faviconFolder);
      response.files.forEach((file) =>
        fs.writeFileSync(`${faviconFolder}${file.name}`, file.contents)
      );
    }

    if (response.html) {
      fs.writeFileSync(`${config.src}/inc/_favicons.html`, response.html.join('\n'));
    }

    done();
  });
}
