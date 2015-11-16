/**
 * Load tasks and export globals
 */

import gulp from 'gulp';
import config from '../config';

import { markupAll } from './markup';
import { bundleApp, bundleVendor } from './scripts';
import { processStyles, generateFonts } from './styles';
import { optimizeImages, generateSpritesheet, generateFavicons } from './images';
import { serve } from './serve';
import { watchFiles as watch } from './watch';

import { buildSitemap } from './build';
import { cleanClearCache, cleanDeleteFiles } from './clean';
import { testMarkup, testScripts, testPsiMobile, testPsiDesktop } from './test';

gulp.task(markupAll);

gulp.task(
  'scripts',
  gulp.parallel(bundleApp, bundleVendor)
);

gulp.task(
  'styles',
  gulp.parallel(processStyles, generateFonts)
);

gulp.task(
  'images',
  gulp.parallel(optimizeImages, generateSpritesheet, generateFavicons)
);

gulp.task(serve);
gulp.task(watch);

gulp.task(
  'build',
  gulp.parallel('scripts', 'styles', buildSitemap)
);

gulp.task(
  'clean',
  gulp.parallel(cleanClearCache, cleanDeleteFiles)
);

gulp.task(
  'testPsi',
  gulp.parallel(testPsiMobile, testPsiDesktop)
);

gulp.task(
  'test',
  gulp.parallel(testMarkup, testScripts)
);

//   if (config.args.env === 'prod') {
//     gulp.start('default:prod');
//   } else if (config.args.env === 'dev') {
//     gulp.start('default:dev');
//   } else {
//     gutil.log(gutil.colors.red('--env flag should be either dev or prod'));
//   }

gulp.task(
  'default',
  // 'default:dev',
  gulp.series(
    gulp.parallel(markupAll, generateFonts, 'styles', 'scripts', 'images'),
    gulp.parallel(serve, watch)
  )
);

gulp.task(
  'default:prod',
  gulp.series(
    gulp.parallel(markupAll, generateFonts, 'images'),
    'build'
  )
);
