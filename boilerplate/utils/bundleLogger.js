import prettyHrtime from 'pretty-hrtime';
import chalk from 'chalk';

let startTime;

export default {
  start: () => {
    startTime = process.hrtime();
    console.log('Bundling...');
  },

  end: () => {
    const taskTime = process.hrtime(startTime);
    const prettyTime = prettyHrtime(taskTime);
    console.log('Bundled in', chalk.magenta(prettyTime));
  }
};
