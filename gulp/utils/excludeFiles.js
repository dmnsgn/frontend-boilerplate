/**
 * Map files copied by the copy task to exclude them from source path provided
 */

module.exports = function(src, excludedFiles) {
	var excludes = excludedFiles.map(function(file) {
		return '!' + file
	});
	return src.concat(excludes);
};
