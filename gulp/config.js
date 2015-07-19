/**
 * Export project config
 */

import pkg from '../package.json';
import minimist from 'minimist';

// Options
let options = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
};

export default {
  args: minimist(process.argv.slice(2), options),
  banner: ['/**',
    ' * ' + pkg.title,
    ' * ' + pkg.description,
    ' * Compiled: ' + Date(),
    ' * @version v' + pkg.version,
    ' * @link ' + pkg.homepage,
    ' * @copyright ' + pkg.license,
    ' */',
    ''
  ].join('\n'),
  developerURL: ''
};
