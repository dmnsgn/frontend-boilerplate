/**
 * Build task
 *
 * Basically build all assets, optimize them (size & usage).
 * Add some copyright stuffs.
 *
 */

import handleErrors from '../utils/handleErrors';
import gulpif from 'gulp-if';

import del from 'del';
import runSequence from 'run-sequence';

import header from 'gulp-header';
import rename from 'gulp-rename';
import filter from 'gulp-filter';
import size from 'gulp-size';

import useref from 'gulp-useref';
import uglify from 'gulp-uglify';
import sitemap from 'gulp-sitemap';

import autoprefixer from 'gulp-autoprefixer';
import minifyCss from 'gulp-minify-css';
import cmq from 'gulp-combine-media-queries';

gulp.task('build', function() {

  runSequence('scripts', 'build:markup', 'build:styles');

});

/**
 * Build markup
 *
 * Markup tasks, change building blocks
 *
 */

gulp.task('build:markup', function() {
  gulp.start('build:markup:sitemap');

  let assets = useref.assets();
  return gulp.src(`${config.dist}/*.html`)
    .pipe(assets)
    .on('error', handleErrors)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest(config.dist));
});

gulp.task('build:markup:sitemap', function() {
  let isUrlDefinned = (typeof config.prodUrl === 'string' && config.prodUrl !== '') ? true : false;

  if (isUrlDefinned) {
    return gulp.src(`${config.dist}/*.html`).pipe(sitemap({
        fileName: 'sitemap.xml',
        siteUrl: config.prodUrl
      }))
      .pipe(gulp.dest(config.dist));
  }
});

/**
 * Build styles
 *
 * Styles task, autoprefix for prod, minify, prepend header, output .min
 * Output file size.
 *
 */

gulp.task('build:styles', function() {
  return gulp.src(`${config.dist}/styles/main.css`)
    .pipe(cmq({
      log: config.verbose
    }))
    .pipe(minifyCss())
    .pipe(header(config.banner))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(`${config.dist}/styles`))
    .pipe(size({
      title: 'Main styles minified size'
    }));
});
