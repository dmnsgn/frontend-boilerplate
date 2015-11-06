/**
 * Watch task
 *
 * Watch all changes in source folder and launch task accordingly
 */

import gutil from 'gulp-util';
import watch from 'gulp-watch';

// function onWatchChange(event) {
//  gutil.log(gutil.colors.gray('File ' + event.path + ' was ' + event.type + ', running tasks...'));
// }

gulp.task('watch', function() {

  // Watch html files
  watch(`${config.src}/*.html`, {
    emitOnGlob: false,
    read: false,
    name: 'Html watcher',
    verbose: config.verbose
  }, function() {
    gulp.start('markup:changed');
  });

  watch(`${config.src}/inc/**/*`, {
    emitOnGlob: false,
    read: false,
    name: 'Includes watcher',
    verbose: config.verbose
  }, function() {
    gulp.start('markup:all');
  });

  // Watch dependencies
  watch('package.json', {
    emitOnGlob: false,
    read: true,
    name: 'Package watcher',
    verbose: config.verbose
  }, function(file) {
    global.pkg = JSON.parse(file.contents.toString());
    gulp.start('markup:all');
    gulp.start('scripts:vendor');
  });

  // Watch styles files
  watch(`${config.src}/styles/**/*.${pkg.extensions.styles}`, {
    emitOnGlob: false,
    read: false,
    name: 'Styles watcher',
    verbose: config.verbose
  }, function() {
    gulp.start('styles');
  });
  watch(`${config.src}/styles/fonts/**/*`, {
    emitOnGlob: false,
    read: false,
    name: 'Fonts watcher',
    verbose: config.verbose
  }, function() {
    gulp.start('styles:fonts');
  });

  // Watch scripts files (using watchify)
  gulp.start('scripts');

  // Watch test files
  watch(`${config.test}/**/*.js`, {
    emitOnGlob: false,
    read: false,
    name: 'Test watcher',
    verbose: config.verbose
  }, function() {
    gulp.start('test:scripts');
  });

  // Watch images files
  watch([`${config.src}/images/**/*`, `!${config.src}/images/sprite/**/*`], {
    emitOnGlob: false,
    read: false,
    name: 'Images watcher',
    verbose: config.verbose
  }, function() {
    gulp.start('images:optimization');
  });
  watch(`${config.src}/images/sprite/**/*`, {
    emitOnGlob: false,
    read: false,
    name: 'Spritesheet watcher',
    verbose: config.verbose
  }, function() {
    gulp.start('images:spritesheet');
  });

  // TODO: waiting for https://github.com/shama/gaze/issues/56 to be resolved
  // Watch html files
  // gulp.watch(config.src + '/*.html', ['markup:changed']).on('change', onWatchChange);
  // gulp.watch(config.src + '/inc/**/*', ['markup:all']).on('change', onWatchChange);

  // // Watch .scss files
  // gulp.watch(config.src + '/styles/**/*.scss', ['styles']).on('change', onWatchChange);

  // // Watch .js files
  // gulp.watch(config.src + '/scripts/**/*.js', ['scripts']).on('change', onWatchChange);

  // // Watch .coffee files
  // gulp.watch(config.src + '/scripts/**/*.coffee', ['scripts:coffee']).on('change', onWatchChange);;

  // // Watch test files
  // gulp.watch(config.test + '/**', ['test:scripts']).on('change', onWatchChange);

  // // Watch images files
  // gulp.watch(config.src + '/images/**/*', ['images']).on('change', onWatchChange);
  // gulp.watch(config.src + '/images/sprite/**/*', ['images:spritesheet']).on('change', onWatchChange);

  gutil.log(gutil.colors.green('Watching changes...'));

});
