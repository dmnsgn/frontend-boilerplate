/**
 * Handle errors nicely
 *
 * Emit sound and notification
 */

var notify = require('gulp-notify');
var gutil = require('gulp-util');

module.exports = function() {
	gutil.beep();

	// End the task
	this.emit('end');

	// Notify what's wrong
	notify.onError({
		title: 'Compile Error',
		message: '<%= error.message %>'
	}).apply(this, Array.prototype.slice.call(arguments));
};
