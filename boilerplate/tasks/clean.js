/**
 * Clean task
 *
 * Clean dist folder, gulp all caches and sass cache
 */

import gulp from 'gulp';
import del from 'del';

import gutil from 'gulp-util';
import cache from 'gulp-cache';

import config from '../config';

export function cleanDeleteFiles(done) {
  return del([`${config.dist}/*`, '.sass-cache'], done);
}

export function cleanClearCache(done) {
  return cache.clearAll(done);
}
