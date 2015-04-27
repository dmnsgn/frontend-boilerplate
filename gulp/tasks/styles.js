/**
 * Styles tasks
 *
 * 'styles' compile sass/less files with sourcemaps and autoprefixer.
 *
 */

var config         = require('../config');
var pkg            = require('../../package.json');
var gulp           = require('gulp');
var gutil          = require('gulp-util');
var handleErrors   = require('../utils/handleErrors');

var browserSync    = require('browser-sync');
var Fontmin        = require('fontmin');

switch (pkg.extensions.styles) {
  case 'scss':
    var sass = require('gulp-ruby-sass');
  break;

  case 'less':
    var less     = require('gulp-less');
    var lessGlob = require('less-plugin-glob');
  break;

  case 'styl':
    var stylus = require('gulp-stylus');
  break;
}

var sourcemaps     = require('gulp-sourcemaps');
var autoprefixer   = require('gulp-autoprefixer');
var filter         = require('gulp-filter');
var size           = require('gulp-size');

function getStylesStream(extension) {
  switch (extension) {

    case 'scss':
      return sass(config.src + '/styles/main.scss', {
          sourcemap: true,
          compass: true,
          require: ['sass-globbing', 'sass-css-importer']
        });
      break;

    case 'less':
      return gulp.src(config.src + '/styles/main.less')
        .pipe(sourcemaps.init())
        .pipe(less({
          plugins: [require('less-plugin-glob')]
        }));
      break;

    case 'styl':
      return gulp.src(config.src + '/styles/main.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
          'include css': true
        }));
      break;

    default:
      return gulp.src(config.src + '/styles/**/*.css');
      break;
  }
}

gulp.task('styles', function() {

  return getStylesStream(pkg.extensions.styles)
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

