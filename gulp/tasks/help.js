/**
 * Help task
 *
 * List all tasks
 *
 */

var gulp = require('gulp');
var taskListing = require('gulp-task-listing');

gulp.task('help', taskListing.withFilters(/:/));
