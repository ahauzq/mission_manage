var fileinclude = require('gulp-file-include'),
  gulp = require('gulp');

gulp.task('html', function() {
  return gulp.src(['views/view/**/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('scheduling/'));
});
