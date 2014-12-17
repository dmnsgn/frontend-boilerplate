/**
 * Export project config
 */

var pkg = require('../package.json');

var sourceFolder = 'src';
var distFolder = 'dist';
var testFolder = 'test';

module.exports = {
	verbose: false,
	port: 3000,
	src: sourceFolder,
	dist: distFolder,
	test: testFolder,
	bower: distFolder + '/bower_components',
	browsers: ['last 2 version', 'safari 5', 'ie 7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
	prodUrl: 'http://test.tld',
	analyticsUA: 'UA-XXXXX-X',
	banner: ['/**',
		' * ' + pkg.name,
		' * ' + pkg.description,
		' * Compiled: ' + Date(),
		' * @version v' + pkg.version,
		' * @link ' + pkg.homepage,
		' * @copyright ' + pkg.license,
		' */',
		''
	].join('\n'),
	developerURL: 'http://damienseguin.me'
};
