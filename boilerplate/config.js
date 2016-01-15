import pkg from '../package.json';
import minimist from 'minimist';

const options = {
  string: 'env',
  default: {
    env: process.env.NODE_ENV || 'dev'
  }
};

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

export default Object.assign({
    args: minimist(process.argv.slice(2), options),
    banner: banner
  }, {
    version: pkg.version,
    title: pkg.title,
    description: pkg.description,
    author: pkg.author,
    extensions: pkg.extensions,
    vendors: pkg.vendors
  },
  pkg.config,
  pkg.directories);
