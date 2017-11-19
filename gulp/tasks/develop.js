var gulp = require('gulp'),
	runSequence = require('gulp-run-sequence'),
	clean = require('gulp-clean');

gulp.task('dev', function(){
	runSequence('sass','watch');
});

gulp.task('clean', function(){
	//gulp.src(config.release.temp_).pipe(clean());
	return gulp.src('public/css/**/*').pipe(clean());
});