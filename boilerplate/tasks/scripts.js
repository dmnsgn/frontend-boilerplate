import gulp from 'gulp';
import { exec } from 'child_process';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';
import browserSync from 'browser-sync';

import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import rename from 'gulp-rename';

import config from '../config';
import bundleLogger from '../utils/bundleLogger';
import handleErrors from '../utils/handleErrors';
import concatenateFiles from '../utils/concatenateFiles';

const envDev = config.args.env === 'dev';

const b = browserify({
  entries: [`${config.src}/scripts/main.${config.extensions.scripts}`],
  extensions: [config.extensions.scripts],
  debug: envDev
});

const bundler = envDev ? watchify(b) : b;

const bundle = function(done) {
  bundleLogger.start();

  return bundler
    .bundle()
    .on('error', handleErrors)
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(envDev ? gutil.noop() : uglify())
    .on('error', handleErrors)
    .pipe(envDev ? gutil.noop() : header(config.banner))
    .pipe(envDev ? gutil.noop() : rename({
      suffix: '.min'
    }))
    .on('end', function() {
      if (envDev) {
        browserSync.reload();
      } else {
        done();
      }
      bundleLogger.end();
    })
    .pipe(gulp.dest(`${config.dist}/scripts`));
};

if (envDev) {
  bundler.on('update', bundle);
}

export function bundleApp(done) {

  if (envDev) {
    bundle();
    done();
  } else {
    bundle(done);
  }

}

export function bundleVendor(done) {

  concatenateFiles({
    src: config.vendors,
    dest: `${config.dist}/scripts`,
    fileName: 'vendor.js'
  }, function() {
    if (!envDev) {
      const cmd = `uglifyjs ${config.dist}/scripts/vendor.js -o ${config.dist}/scripts/vendor.min.js`;
      exec(cmd, function(error, stdout, stderr) {
        done();
      });
    } else {
      done();
    }
  });

}
