var gulp = require('gulp'),
	livereload = require('gulp-livereload');

gulp.task('watch', function () {
	gulp.watch(['public/scss/**/*.scss'], ['sass']);
});