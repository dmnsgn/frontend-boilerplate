/**
 * Build task
 */

import gulp from 'gulp';

import sitemap from 'gulp-sitemap';

import config from '../config';

export function buildSitemap(done) {
  const isUrlDefinned = (typeof config.prodURL === 'string' && config.prodURL !== '') ? true : false;

  if (isUrlDefinned) {
    return gulp.src(`${config.dist}/*.html`).pipe(sitemap({
        fileName: 'sitemap.xml',
        siteUrl: config.prodURL
      }))
      .pipe(gulp.dest(config.dist));
  } else {
    done();
  }
}
