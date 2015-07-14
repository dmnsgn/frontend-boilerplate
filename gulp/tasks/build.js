/**
 * Build task
 *
 * Basically build all assets, optimize them (size & usage).
 * Add some copyright stuffs.
 *
 */

import handleErrors from '../utils/handleErrors';

import del from 'del';
import runSequence from 'run-sequence';

import useref from 'gulp-useref';
import sitemap from 'gulp-sitemap';

gulp.task('build', function() {

  runSequence('scripts', 'styles', 'build:markup');

});

/**
 * Build markup
 *
 * Markup tasks, change building blocks
 *
 */

gulp.task('build:markup', function() {
  gulp.start('build:markup:sitemap');

  let assets = useref.assets();
  return gulp.src(`${config.dist}/*.html`)
    .pipe(assets)
    .on('error', handleErrors)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(config.dist));
});

gulp.task('build:markup:sitemap', function() {
  let isUrlDefinned = (typeof config.prodUrl === 'string' && config.prodUrl !== '') ? true : false;

  if (isUrlDefinned) {
    return gulp.src(`${config.dist}/*.html`).pipe(sitemap({
        fileName: 'sitemap.xml',
        siteUrl: config.prodUrl
      }))
      .pipe(gulp.dest(config.dist));
  }
});
