import browserSync from 'browser-sync';

import config from '../config';

export const server = browserSync.create();

export function reload(done) {
  server.reload();
  done();
}

export function serve(done) {
  const logLevel = config.verbose ? 'debug' : 'info';

  server.init({
    server: {
      baseDir: config.dist,
      directory: true
    },
    port: config.port,
    logConnections: true,
    logLevel
  }, done);
}

serve.description = 'Serve dist directory using browserSync.';
