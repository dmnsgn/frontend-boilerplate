/**
 * Styles tasks
 *
 * 'styles' compile sass/less/stylus files with sourcemaps and autoprefixer.
 *
 */

import gutil from 'gulp-util';
import handleErrors from '../utils/handleErrors';

import browserSync from 'browser-sync';
import Fontmin from 'fontmin';

var preprocessor;

switch (pkg.extensions.styles) {
  case 'scss':
    var preprocessor = require('gulp-ruby-sass');
  break;

  case 'less':
    var preprocessor     = require('gulp-less');
    var lessGlob = require('less-plugin-glob');
  break;

  case 'styl':
    var preprocessor = require('gulp-stylus');
  break;
}

import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import filter from 'gulp-filter';
import size from 'gulp-size';

function getStylesStream(extension) {
  switch (extension) {

    case 'scss':
      return preprocessor(`${config.src}/styles/main.scss`, {
          sourcemap: true,
          compass: true,
          require: ['sass-globbing', 'sass-css-importer']
        });
      break;

    case 'less':
      return gulp.src(`${config.src}/styles/main.less`)
        .pipe(sourcemaps.init())
        .pipe(preprocessor({
          plugins: [require('less-plugin-glob')]
        }));
      break;

    case 'styl':
      return gulp.src(`${config.src}/styles/main.styl`)
        .pipe(sourcemaps.init())
        .pipe(preprocessor({
          'include css': true
        }));
      break;

    default:
      return gulp.src(`${config.src}/styles/**/*.css`);
      break;
  }
}

gulp.task('styles', function() {

  return getStylesStream(pkg.extensions.styles)
    .on('error', handleErrors)
    .pipe(autoprefixer(config.browsers))
    .pipe(config.args.env !== 'dev' ? gutil.noop() : sourcemaps.write())
    .pipe(gulp.dest(`${config.dist}/styles`))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({
      stream: true
    }));

});


gulp.task('styles:fonts', function() {
  let fontmin = new Fontmin()
    .src(`${config.src}/styles/fonts/*.ttf`)
    .use(Fontmin.ttf2eot({
      clone: true
    }))
    .use(Fontmin.ttf2woff({
      clone: true
    }))
    .use(Fontmin.ttf2svg({
      clone: true
    }))
    .dest(`${config.dist}/styles/fonts`);

  return fontmin.run(
    function (err, files, stream) {
      if (err) {
        console.log(err);
      }
    }
  );
});

