import gulp from 'gulp';
import psi from 'psi';

import w3cjs from 'gulp-w3cjs';
import mocha from 'gulp-mocha';

import config from '../config';
import handleErrors from '../utils/handleErrors';

export function testMarkup() {
  return gulp.src(`${config.dist}/*.html`)
    .pipe(w3cjs())
    .pipe(w3cjs.reporter());
}

testMarkup.description = 'Validate markup.';

export function testScripts() {
  return gulp.src(`${config.test}/*.js`, {
    read: false
  })
  .pipe(mocha({
    reporter: 'progress'
  }))
  .on('error', handleErrors);
}

testScripts.description = 'Run mocha tests.';

// https://github.com/addyosmani/psi-gulp-sample/blob/master/gulpfile.js
//
// Please feel free to use the `nokey` option to try out PageSpeed
// Insights as part of your build process. For more frequent use,
// we recommend registering for your own API key. For more info:
// https://developers.google.com/speed/docs/insights/v1/getting_started

export function testPsiMobile() {
  return psi.output(config.prodURL, {
    nokey: 'true',
    strategy: 'mobile'
  });
}

export function testPsiDesktop() {
  return psi.output(config.prodURL, {
    nokey: 'true',
    strategy: 'desktop'
  });
}
