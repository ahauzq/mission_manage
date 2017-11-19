var gulp = require('gulp');
var tmodjs = require('gulp-tmod');
 
gulp.task('tpl', function(){
  gulp.src(['views/tpl/**/*.tpl'])
			.pipe(tmodjs({
				base: 'views/tpl',
				combo: true,
				type: 'amd',
				output: 'public/template',
				helpers: 'src/js/template/helper.js'
		})).pipe(gulp.dest('build/assets/template'));
});
