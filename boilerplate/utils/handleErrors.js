import notify from 'gulp-notify';
import gutil from 'gulp-util';

export default function() {
  gutil.beep();

  // End the task
  this.emit('end');

  // Notify what's wrong
  notify.onError({
    title: 'Error',
    message: '<%= error.message %>'
  }).apply(this, Array.prototype.slice.call(arguments));
};
