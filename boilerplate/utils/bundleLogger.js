/**
 * bundleLogger
 */

import gutil from 'gulp-util';
import prettyHrtime from 'pretty-hrtime';

let startTime;

export default {
  start: function() {
    startTime = process.hrtime();
    gutil.log('Bundling...');
  },

  end: function() {
    const taskTime = process.hrtime(startTime);
    const prettyTime = prettyHrtime(taskTime);
    gutil.log('Bundled in', gutil.colors.magenta(prettyTime));
  }
}
