/**
 * Clean task
 *
 * Clean dist folder, gulp all caches and sass cache
 */

import gutil from 'gulp-util';
import del from 'del';

import cache from 'gulp-cache';

gulp.task('clean', ['clean:clearCache', 'clean:deleteFiles']);

gulp.task('clean:deleteFiles', function() {
  del([`${config.dist}/*`, '.sass-cache']);
});

gulp.task('clean:clearCache', function() {
  cache.clearAll();
});
