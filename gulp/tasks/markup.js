/**
 * Markup tasks
 *
 * 'markup:all' when all html files need to be processed.
 * 'markup:changed' when only the main files changed.
 *
 * Process html files.
 * Copy them to dist folder.
 * Reload connection.
 *
 */

import gulpif from 'gulp-if';

import browserSync from 'browser-sync';

import newer from 'gulp-newer';
import preprocess from 'gulp-preprocess';

function process(changed) {
	return gulp.src(`${config.src}/*.html`, {
			base: config.src
		})
		.pipe(gulpif(changed, newer(config.dist)))
		.pipe(preprocess({
			context: {
				NODE_ENV: 'dev',
				UA: config.analyticsUA
			}
		}))
		.pipe(gulp.dest(config.dist))
		.on('end', function() {
			browserSync.reload()
		});
};

gulp.task('markup:changed', function() {
	return process(true);
});

gulp.task('markup:all', function() {
	return process();
});
