/**
 *  Default task
 *
 * 'default:dev' immediatly work on sources files.
 * 'default:prod' generate a deployable build and serve it to check if it's ok to deploy.
 */

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');

var runSequence = require('run-sequence');

gulp.task('default', function() {
  var args = process.argv,
    prod = args.indexOf('--prod') !== -1;
  if (prod) {
    gulp.start('default:prod');
  } else {
    gulp.start('default:dev');
  }
});

gulp.task('default:dev', function() {

  runSequence('setWatch', ['markup:all', 'styles:fonts', 'styles', 'scripts', 'images'], ['serve', 'watch']);

});

gulp.task('default:prod', function() {

  runSequence(['markup:all', 'styles:fonts', 'styles', 'images'], 'build', 'serve', function() {
    gutil.log(gutil.colors.green('Build ready and served.'));
  });

});
