/**
 * Scripts task
 *
 * Bundle scripts with browserify
 *
 */

import gutil from 'gulp-util';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserSync from 'browser-sync';
import browserify from 'browserify';
import watchify from 'watchify';

import uglify from 'gulp-uglify';
import header from 'gulp-header';
import rename from 'gulp-rename';

import bundleLogger from '../utils/bundleLogger';
import handleErrors from '../utils/handleErrors';

gulp.task('scripts', function(callback) {

  let b = browserify({
    cache: {},
    packageCache: {},
    fullPaths: false,
    entries: [`./${config.src}/scripts/main.${pkg.extensions.scripts}`],
    extensions: [pkg.extensions.scripts],
    debug: global.isWatching
  });

  let bundler = global.isWatching ? watchify(b) : b;

  let bundle = function() {

    bundleLogger.start();

    return bundler
      .bundle()
      .on('error', handleErrors)
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(global.isWatching ? gutil.noop() : uglify())
      .on('error', handleErrors)
      .pipe(global.isWatching ? gutil.noop() : header(config.banner))
      .pipe(global.isWatching ? gutil.noop() : rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(`./${config.dist}/scripts`))
      .on('end', function() {
        if (global.isWatching) {
          browserSync.reload();
        }
        bundleLogger.end();
      })
  };

  if (global.isWatching) {
    bundler.on('update', bundle);
  }

  return bundle();

});
