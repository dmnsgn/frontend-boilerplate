import gulp from 'gulp';

import browserSync from 'browser-sync';
import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import csswring from 'csswring';
import Fontmin from 'fontmin';

import gutil from 'gulp-util';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import filter from 'gulp-filter';
import header from 'gulp-header';
import rename from 'gulp-rename';

import config from '../config';
import handleErrors from '../utils/handleErrors';

let preprocessor, processors, envDev = config.args.env === 'dev';

// Processors
if (envDev) {
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
switch (config.extensions.styles) {
  case 'scss':
    preprocessor = require('gulp-sass');
    var sassGlob = require('gulp-sass-glob');
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
      return gulp.src(`${config.src}/styles/main.scss`)
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(preprocessor());
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

export function processStyles() {

  return getStylesStream(config.extensions.styles)
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

}

export function generateFonts(done) {
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
      done();
      if (err) {
        console.log(err);
      }
    }
  );
}
