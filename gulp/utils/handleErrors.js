/**
 * Handle errors nicely
 *
 * Emit sound and notification
 */

var notify = require('gulp-notify');
var gutil = require('gulp-util');

module.exports = function() {
	gutil.beep();

	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, Array.prototype.slice.call(arguments));
};
