/**
 * Build task
 */

import runSequence from 'run-sequence';

import sitemap from 'gulp-sitemap';

gulp.task('build', function() {

  runSequence('scripts', 'styles', 'build:sitemap');

});

gulp.task('build:sitemap', function() {
  let isUrlDefinned = (typeof config.prodUrl === 'string' && config.prodUrl !== '') ? true : false;

  if (isUrlDefinned) {
    return gulp.src(`${config.dist}/*.html`).pipe(sitemap({
        fileName: 'sitemap.xml',
        siteUrl: config.prodUrl
      }))
      .pipe(gulp.dest(config.dist));
  }
});
