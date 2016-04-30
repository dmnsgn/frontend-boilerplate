import gulp from 'gulp';

import chalk from 'chalk';

import config from '../config';

import { markup } from './markup';
import { processStyles, generateFonts } from './styles';
import { bundleVendor } from './scripts';
import { optimizeImages, generateSpritesheet } from './images';
import { testScripts } from './test';

function onWatchAdd(path) {
  console.log(`File ${chalk.underline.green(path)} has been added.`);
}

function onWatchChange(path) {
  console.log(`File ${chalk.underline.yellow(path)} was changed.`);
}

function onWatchRemove(path) {
  console.log(`File ${chalk.underline.red(path)} has been removed.`);
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
    gulp.watch(`${config.src}/*.html`, markup),
    gulp.watch(`${config.src}/inc/**/*`, markup),

    // Watch styles files
    gulp.watch(`${config.src}/styles/**/*.${config.extensions.styles}`, processStyles),
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
