/**
 * Styles tasks
 *
 * 'styles' compile sass/less/stylus files with sourcemaps and autoprefixer.
 * 'styles:fonts' convert fonts.
 */

import gutil from 'gulp-util';
import handleErrors from '../utils/handleErrors';

import browserSync from 'browser-sync';
import Fontmin from 'fontmin';

import sourcemaps from 'gulp-sourcemaps';

import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import csswring from 'csswring';

import filter from 'gulp-filter';
import header from 'gulp-header';
import rename from 'gulp-rename';

let preprocessor, processors, envDev = config.args.env === 'dev';

// Processors
if (config.args.env === 'dev') {
  processors = [
    autoprefixer({
      browsers: config.browsers
    })
  ];
} else {
  processors = [
    autoprefixer({
      browsers: config.browsers
    }),
    mqpacker,
    csswring({
      preserveHacks: true,
      removeAllComments: true
    })
  ];
}

// Preprocessor
switch (pkg.extensions.styles) {
  case 'scss':
  preprocessor = require('gulp-ruby-sass');
    break;

  case 'less':
    preprocessor = require('gulp-less');
    var lessGlob = require('less-plugin-glob');
    break;

  case 'styl':
    preprocessor = require('gulp-stylus');
    break;
}

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
    .pipe(postcss(processors))
    .pipe(envDev ? sourcemaps.write() : gutil.noop())
    .pipe(envDev ? gutil.noop() : header(config.banner))
    .pipe(envDev ? gutil.noop() : rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(`${config.dist}/styles`))
    .pipe(filter('**/*.css'))
    .pipe(browserSync.reload({
      stream: true
    }));

});


gulp.task('styles:fonts', function() {
  const fontmin = new Fontmin()
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
    function(err, files, stream) {
      if (err) {
        console.log(err);
      }
    }
  );
});
