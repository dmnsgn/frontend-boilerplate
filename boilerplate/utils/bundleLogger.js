/**
 * bundleLogger
 */

import prettyHrtime from 'pretty-hrtime';

let startTime;

export default {
  start: function() {
    startTime = process.hrtime();
    console.log('Bundling...');
  },

  end: function() {
    const taskTime = process.hrtime(startTime);
    const prettyTime = prettyHrtime(taskTime);
    console.log('Bundled in', chalk.magenta(prettyTime));
  }
}
