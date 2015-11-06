/**
 * Scripts task
 *
 * Bundle scripts with browserify
 */

import gutil from 'gulp-util';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import browserSync from 'browser-sync';

import uglify from 'gulp-uglify';
import header from 'gulp-header';
import rename from 'gulp-rename';

import bundleLogger from '../utils/bundleLogger';
import handleErrors from '../utils/handleErrors';
import concatenateFiles from '../utils/concatenateFiles';

gulp.task('scripts', ['scripts:app', 'scripts:vendor']);

let envDev = config.args.env === 'dev';

/**
 * Build app
 */

const b = browserify({
  entries: [`${config.src}/scripts/main.${pkg.extensions.scripts}`],
  extensions: [pkg.extensions.scripts],
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
    .pipe(gulp.dest(`${config.dist}/scripts`))
    .on('end', function() {
      if (envDev) {
        browserSync.reload();
      }
      bundleLogger.end();
    })
};
if (envDev) {
  bundler.on('update', bundle);
}
gulp.task('scripts:app', bundle);

/**
 * Build vendor
 */

gulp.task('scripts:vendor', function() {
  concatenateFiles({
    src: pkg.vendors,
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
});
