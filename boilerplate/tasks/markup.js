import gulp from 'gulp';

import browserSync from 'browser-sync';

import gutil from 'gulp-util';
import newer from 'gulp-newer';
import preprocess from 'gulp-preprocess';

import config from '../config';

export function markup(done, all) {

  return gulp.src(`${config.src}/*.html`, {
      base: config.src
    })
    // .pipe(all ? gutil.noop() : newer(config.dist))
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

markup.description = `Process html files with environment configuration.`;
