/**
 * Scripts task
 *
 * Bundle scripts with browserify
 */

import gulp from 'gulp';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import browserSync from 'browser-sync';

import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import rename from 'gulp-rename';

import config from '../config';
import bundleLogger from '../utils/bundleLogger';
import handleErrors from '../utils/handleErrors';
import concatenateFiles from '../utils/concatenateFiles';

const envDev = config.args.env === 'dev';

const b = browserify({
  entries: [`${config.src}/scripts/main.${config.extensions.scripts}`],
  extensions: [config.extensions.scripts],
  debug: envDev
});

const bundler = envDev ? watchify(b) : b;

const bundle = function() {
  bundleLogger.start();

  return bundler
    .bundle()
    .on('error', handleErrors)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(envDev ? gutil.noop() : uglify())
    .on('error', handleErrors)
    .pipe(envDev ? gutil.noop() : header(config.banner))
    .pipe(envDev ? gutil.noop() : rename({
      suffix: '.min'
    }))
    .on('end', function() {
      if (envDev) {
        browserSync.reload();
      }
      bundleLogger.end();
    })
    .pipe(gulp.dest(`${config.dist}/scripts`));
};
if (envDev) {
  bundler.on('update', bundle);
}
export function bundleApp() {
  bundle();
}

export function bundleVendor() {
  concatenateFiles({
    src: config.vendors,
    dest: `${config.dist}/scripts`,
    fileName: 'vendor.js'
  }, function() {
    if (!envDev) {
      return gulp.src(`${config.dist}/scripts/vendor.js`)
        .pipe(uglify())
        .on('error', handleErrors)
        .pipe(rename({
          suffix: '.min'
        }))
        .pipe(gulp.dest(`${config.dist}/scripts`))
    }
  });
}
