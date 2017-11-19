var gulp = require('gulp'),
	compass = require('gulp-compass');


gulp.task('sass', function(){
	return gulp.src('public/scss/**/*.scss')
		.pipe(compass({
			css: 'public/css',
			sass: 'public/scss',
			image: 'public/images',
			style: 'compressed'
		}))
		.pipe(gulp.dest('public/css'));
});
