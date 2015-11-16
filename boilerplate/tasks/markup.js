/**
 * Markup tasks
 *
 * 'markup:all' when all html files need to be processed.
 * 'markup:changed' when only the main files changed.
 *
 * Process html files.
 * Copy them to dist folder.
 * Reload connection.
 */

import gulp from 'gulp';

import browserSync from 'browser-sync';

import gutil from 'gulp-util';
import newer from 'gulp-newer';
import preprocess from 'gulp-preprocess';

import config from '../config';

export function markupAll() {

  return gulp.src(`${config.src}/*.html`, {
      base: config.src
    })
    // .pipe(changed ? newer(config.dist) : gutil.noop())
    .pipe(preprocess({
      context: {
        ENV: config.args.env,
        META: {
          title: config.title,
          description: config.description,
          url: config.prodURL,
          image: config.shareImageURL,
          twitterHandle: config.twitterHandle
        },
        UA: config.analyticsUA
      }
    }))
    .pipe(gulp.dest(config.dist))
    .on('end', function() {
      browserSync.reload()
    });

}
