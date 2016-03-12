import * as fs from 'fs';
import minimist from 'minimist';

let config;

const options = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
};

export function updateConfig(done) {
  const pkg = JSON.parse(fs.readFileSync('./package.json', { encoding: 'utf-8' }));

  const banner =
  `/**
   * ${pkg.title}
   * ${pkg.description}
   * Compiled: ${Date()}
   * @version v${pkg.version}
   * @link ${pkg.homepage}
   * @copyright ${pkg.license}
   */
  `;

  config = Object.assign({
    args: minimist(process.argv.slice(2), options),
    banner
  }, {
    version: pkg.version,
    title: pkg.title,
    description: pkg.description,
    author: pkg.author,
    extensions: pkg.extensions,
    vendors: pkg.vendors
  }, pkg.config, pkg.directories);

  done();
}

updateConfig(() => {});

export default config;

export function getConfig() {
  updateConfig(() => {});

  return config;
}
