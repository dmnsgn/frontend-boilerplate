import gulp from 'gulp';

import preprocess from 'gulp-preprocess';

import config from '../config';

export function markup() {
  return gulp.src(`${config.src}/*.html`, {
    base: config.src
  })
  .pipe(preprocess({
    context: {
      ENV: config.args.env,
      META: {
        title: config.title,
        description: config.description,
        url: config.prodURL,
        image: config.shareImageURL,
        twitterHandle: config.twitterHandle,
        twitterImage: config.twitterImage,
        themeColor: config.themeColor
      },
      UA: config.analyticsUA
    }
  }))
  .pipe(gulp.dest(config.dist));
}

markup.description = 'Process html files with environment configuration.';
