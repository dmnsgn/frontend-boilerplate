import gulp from 'gulp';

import path from 'path';
import chalk from 'chalk';
import del from 'del';

import config from '../config';

import { reload } from './serve';
import { markup } from './markup';
import { processStyles, generateFonts } from './styles';
import { bundleVendor } from './scripts';
import { optimizeImages, generateSpritesheet } from './images';
import { testScripts } from './test';

function onWatchAdd(filePath) {
  console.log(`File ${chalk.underline.green(filePath)} has been added.`);
}

function onWatchChange(filePath) {
  console.log(`File ${chalk.underline.yellow(filePath)} was changed.`);
}

function onWatchRemove(filePath) {
  const filePathFromSrc = path.relative(path.resolve(config.src), filePath);
  const destFilePath = path.resolve(config.dist, filePathFromSrc);
  del.sync(destFilePath);

  console.log(`File ${chalk.underline.red(filePath)} has been removed.`);
}

function onWatchError(error) {
  console.log(chalk.underline.red('Error happened', error));
}

function addEventsHandlers(watcher) {
  return watcher
    .on('add', onWatchAdd)
    .on('change', onWatchChange)
    .on('unlink', onWatchRemove)
    .on('error', onWatchError);
}

export function watch(done) {
  const watchers = [
    // Watch html files
    gulp.watch(`${config.src}/*.html`, gulp.series(markup, reload)),
    gulp.watch(`${config.src}/inc/**/*`, gulp.series(markup, reload)),

    // Watch styles files
    gulp.watch(
      `${config.src}/styles/**/*.${config.extensions.styles}`,
      processStyles
    ),
    gulp.watch(`${config.src}/styles/fonts/**/*`, generateFonts),

    // Watch package.json file
    gulp.watch('package.json', bundleVendor),

    // Watch images files
    gulp.watch([`${config.src}/images/**/*`, `!${config.src}/images/sprite/**/*`], optimizeImages),
    gulp.watch(`${config.src}/images/sprite/**/*`, generateSpritesheet),

    // Watch test files
    gulp.watch(`${config.test}/**/*.js`, testScripts)
  ];

  watchers.map(watcher => addEventsHandlers(watcher));

  console.log(chalk.green('Watching changes...'));
  done();
}

watch.description = 'Watch all changes in source folder and launch task accordingly.';
