/**
 * Load tasks and export globals
 */

import gulp from 'gulp';

import config from '../config';

import { markup } from './markup';
import { bundleApp, bundleVendor } from './scripts';
import { processStyles, generateFonts } from './styles';
import { optimizeImages, generateSpritesheet, generateFavicons } from './images';
import { serve } from './serve';
import { watch } from './watch';

import { buildSitemap } from './build';
import { cleanClearCache, cleanDeleteFiles } from './clean';
import { testMarkup, testScripts, testPsiMobile, testPsiDesktop } from './test';

// Tasks
gulp.task(markup);

gulp.task(
  'scripts',
  gulp.parallel(bundleApp, bundleVendor)
);
const scriptTask = gulp.task('scripts');
scriptTask.description = 'Bundle app scripts with browserify (watchify) and concatenate vendors.';

gulp.task(
  'styles',
  gulp.parallel(processStyles, generateFonts)
);
const stylesTask = gulp.task('styles');
stylesTask.description = 'Compile sass/less/stylus files with sourcemaps + autoprefixer and convert fonts.';

gulp.task(
  'images',
  gulp.parallel(optimizeImages, generateSpritesheet, generateFavicons)
);
const imagesTask = gulp.task('images');
imagesTask.description = 'Optimize new images and cache them, create a spritesheet and generate favicons/metas.';

gulp.task(serve);
gulp.task(watch);

gulp.task(
  'build',
  gulp.parallel('scripts', 'styles', buildSitemap)
);
const buildTask = gulp.task('build');
buildTask.description = 'Build scripts and styles with minification tasks.';

gulp.task(
  'clean',
  gulp.parallel(cleanClearCache, cleanDeleteFiles)
);
const cleanTask = gulp.task('clean');
cleanTask.description = 'Clean dist folder, gulp all caches and sass cache.';

gulp.task(
  'testPsi',
  gulp.parallel(testPsiMobile, testPsiDesktop)
);
const testPsiTask = gulp.task('testPsi');
testPsiTask.description = 'PageSpeed Insights reportings.';

gulp.task(
  'test',
  gulp.parallel(testMarkup, testScripts)
);
const testTask = gulp.task('test');
testTask.description = 'Validate markup, run mocha tests.';

// Default task
if (config.args.env === 'dev') {
  gulp.task(
    'default',
    gulp.series(
      gulp.parallel(markup, 'styles', 'scripts', 'images'),
      gulp.parallel(serve, watch)
    )
  );
} else if (config.args.env === 'prod') {
  gulp.task(
    'default',
    gulp.series(
      gulp.parallel(markup, 'images'),
      'build'
    )
  );
} else {
  console.log(chalk.red('--env flag should be either dev or prod'));
  process.exit(1);
}

const defaultTask = gulp.task('default');
defaultTask.description = 'Launch dev or prod default task.';
