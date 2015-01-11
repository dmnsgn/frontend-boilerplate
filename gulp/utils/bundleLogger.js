/**
 * bundleLogger
 *
 * Provides gulp style logs to the bundle method in browserify.js
 */

var gutil = require('gulp-util');
var prettyHrtime = require('pretty-hrtime');
var startTime;

module.exports = {
	start: function() {
		startTime = process.hrtime();
		gutil.log('Bundling...');
	},

	watch: function(bundleName) {
		gutil.log('Watching files required by', gutil.colors.yellow(bundleName));
	},

	end: function() {
		var taskTime = process.hrtime(startTime);
		var prettyTime = prettyHrtime(taskTime);
		gutil.log('Bundled in', gutil.colors.magenta(prettyTime));
	}
};
