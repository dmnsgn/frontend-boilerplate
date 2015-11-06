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

import gutil from 'gulp-util';

import browserSync from 'browser-sync';

import newer from 'gulp-newer';
import preprocess from 'gulp-preprocess';

function process(changed) {
  return gulp.src(`${config.src}/*.html`, {
      base: config.src
    })
    .pipe(changed ? newer(config.dist) : gutil.noop())
    .pipe(preprocess({
      context: {
        ENV: config.args.env,
        META: {
          title: pkg.title,
          description: pkg.description,
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
};

gulp.task('markup:changed', function() {
  return process(true);
});

gulp.task('markup:all', function() {
  return process();
});
