import gulp from 'gulp';

import autoprefixer from 'autoprefixer';
import mqpacker from 'css-mqpacker';
import csswring from 'csswring';
import Fontmin from 'fontmin';

import gutil from 'gulp-util';
import postcss from 'gulp-postcss';
import sourcemaps from 'gulp-sourcemaps';
import header from 'gulp-header';
import rename from 'gulp-rename';

import config from '../config';
import { server } from './serve';
import handleErrors from '../utils/handleErrors';

let preprocessor;
let processors;
const envDev = config.args.env === 'dev';

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
let sassGlob;
let lessGlob;

switch (config.extensions.styles) {
  case 'scss': {
    preprocessor = require('gulp-sass');
    sassGlob = require('gulp-sass-glob');
    break;
  }

  case 'less': {
    preprocessor = require('gulp-less');
    lessGlob = require('less-plugin-glob');
    break;
  }

  case 'styl': {
    preprocessor = require('gulp-stylus');
    break;
  }

  case 'css': {
    break;
  }

  default:
    console.log('Wrong css extension in package.json');
    break;
}

function getStylesStream(extension) {
  switch (extension) {
    case 'scss':
      return gulp.src(`${config.src}/styles/main.scss`)
        .pipe(sassGlob())
        .pipe(sourcemaps.init())
        .pipe(preprocessor());

    case 'less':
      return gulp.src(`${config.src}/styles/main.less`)
        .pipe(sourcemaps.init())
        .pipe(preprocessor({
          plugins: [lessGlob]
        }));

    case 'styl':
      return gulp.src(`${config.src}/styles/main.styl`)
        .pipe(sourcemaps.init())
        .pipe(preprocessor({
          'include css': true
        }));

    default:
      return gulp.src(`${config.src}/styles/**/*.css`);
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
    .pipe(server.stream());
}

export function generateFonts(done) {
  const fontmin = new Fontmin()
    .src(`${config.src}/styles/fonts/*.{ttf,otf}`)
    .use(Fontmin.otf2ttf({
      clone: true
    }))
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

  return fontmin.run((err) => {
    if (err) {
      console.log(err);
    }
    done();
  });
}
