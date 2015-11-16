/**
 * Serve task
 *
 * Serve dist directory
 * Log url to access from external devices (such as smartphone on the same network)
 * Log on device connection
 */

import gulp from 'gulp';

import browserSync from 'browser-sync';

import config from '../config';

export function serve() {

  const logLevel = config.verbose ? 'debug' : 'info';

  browserSync({
    server: {
      baseDir: config.dist,
      directory: true
    },
    port: config.port,
    logConnections: true,
    logLevel: logLevel
  });
}
