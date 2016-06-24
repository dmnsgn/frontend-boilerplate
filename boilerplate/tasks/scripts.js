import gulp from 'gulp';
import { exec } from 'child_process';

import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import browserify from 'browserify';
import watchify from 'watchify';

import gutil from 'gulp-util';
import uglify from 'gulp-uglify';
import header from 'gulp-header';
import rename from 'gulp-rename';

import { reload } from './serve';
import config, { getConfig } from '../config';
import bundleLogger from '../utils/bundleLogger';
import handleErrors from '../utils/handleErrors';
import concatenateFiles from '../utils/concatenateFiles';

const envDev = config.args.env === 'dev';

const b = browserify({
  entries: [`${config.src}/scripts/main.${config.extensions.scripts}`],
  extensions: [config.extensions.scripts],
  debug: envDev,
  cache: {},
  packageCache: {},
  fullPaths: envDev
});

const bundler = envDev ? watchify(b) : b;

const bundle = (done) => {
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
    .on('end', () => {
      if (envDev) {
        reload(() => {});
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
  const updatedConfig = getConfig();

  concatenateFiles({
    src: updatedConfig.vendors,
    dest: `${updatedConfig.dist}/scripts`,
    fileName: 'vendor.js'
  }, () => {
    if (!envDev) {
      const cmd = `./node_modules/.bin/uglifyjs ${updatedConfig.dist}/scripts/vendor.js \
        -o ${updatedConfig.dist}/scripts/vendor.min.js`;

      exec(cmd, (error) => {
        if (error !== null) {
          console.log(`exec error: ${error}`);
        } else {
          done();
        }
      });
    } else {
      done();
    }
  });
}
