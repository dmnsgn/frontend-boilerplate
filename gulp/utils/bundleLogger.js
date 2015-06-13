/**
 * bundleLogger
 *
 * Provides gulp style logs to the bundle method in browserify.js
 */

import gutil from 'gulp-util';
import prettyHrtime from 'pretty-hrtime';

var startTime;

export default {
	start: function() {
		startTime = process.hrtime();
		gutil.log('Bundling...');
	},

	watch: function(bundleName) {
		gutil.log('Watching files required by', gutil.colors.yellow(bundleName));
	},

	end: function() {
		let taskTime = process.hrtime(startTime);
		let prettyTime = prettyHrtime(taskTime);
		gutil.log('Bundled in', gutil.colors.magenta(prettyTime));
	}
};
