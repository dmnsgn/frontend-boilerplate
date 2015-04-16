/**
 * Styles tasks
 *
 * 'styles' compile sass files with sourcemaps.
 *
 */

var config       = require('../config');
var gulp         = require('gulp');
var gutil        = require('gulp-util');
var handleErrors = require('../utils/handleErrors');

var browserSync  = require('browser-sync');
var Fontmin      = require('fontmin');

var sass         = require('gulp-ruby-sass');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var filter       = require('gulp-filter');
var size         = require('gulp-size');

gulp.task('styles', function() {
  return sass(config.src + '/styles/main.scss', {
      sourcemap: true,
      compass: true,
      require: ['sass-globbing', 'sass-css-importer']
    })
    .on('error', handleErrors)
    .pipe(autoprefixer(config.browsers))
    .pipe(!global.isWatching ? gutil.noop() : sourcemaps.write())
    .pipe(gulp.dest(config.dist + '/styles'))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


gulp.task('styles:fonts', function() {
  var fontmin = new Fontmin()
    .src(config.src + '/styles/fonts/*.ttf')
    .use(Fontmin.ttf2eot({
      clone: true
    }))
    .use(Fontmin.ttf2woff({
      clone: true
    }))
    .use(Fontmin.ttf2svg({
      clone: true
    }))
    .dest(config.dist + '/styles/fonts');

  return fontmin.run(
    function (err, files, stream) {
      if (err) {
        console.log(err);
      }
    }
  );
});

