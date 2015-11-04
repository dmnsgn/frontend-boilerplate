/**
 * Build task
 */

import runSequence from 'run-sequence';

import sitemap from 'gulp-sitemap';

gulp.task('build', function() {

  runSequence('scripts', 'styles', 'build:sitemap');

});

gulp.task('build:sitemap', function() {
  const isUrlDefinned = (typeof config.prodURL === 'string' && config.prodURL !== '') ? true : false;

  if (isUrlDefinned) {
    return gulp.src(`${config.dist}/*.html`).pipe(sitemap({
        fileName: 'sitemap.xml',
        siteUrl: config.prodURL
      }))
      .pipe(gulp.dest(config.dist));
  }
});
