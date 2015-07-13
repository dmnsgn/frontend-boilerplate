/**
 * Export project config
 */

import pkg from '../package.json';
import minimist from 'minimist';

const SOURCE = 'src';
const DIST = 'dist';
const TEST = 'test';

// Options
let options = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
};

export default {
  args: minimist(process.argv.slice(2), options),
  verbose: false,
  port: 3000,
  src: SOURCE,
  dist: DIST,
  test: TEST,
  browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
  prodUrl: 'http://test.tld',
  analyticsUA: 'UA-XXXXX-X',
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
