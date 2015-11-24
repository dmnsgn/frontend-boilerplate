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

serve.description = 'Serve dist directory using browserSync.';
