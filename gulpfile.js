var gulp = require('gulp');
var sass = require('gulp-sass');
var less = require('gulp-less');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var del = require('del');

gulp.task('sass', function() {
  return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss
    .pipe(sass())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});
gulp.task('less',function(){
	return gulp.src('src/less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('src/css'))

});
gulp.task('watch', ['browserSync', 'sass'], function (){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/less/**/*.less', ['less']);
  // Reloads the browser whenever HTML or JS files change
  gulp.watch('src/*.html', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'src'
    },
  })
});

gulp.task('useref', function(){
  return gulp.src('src/*.html')
    // Minifies only if it's a CSS file
    .pipe(uglify()) // Uglifies Javascript files
    .pipe(useref())
    .pipe(gulpIf('src/css/**/*.css', minifyCSS()))
    // Uglifies only if it's a Javascript file
    .pipe(gulpIf('src/js/**/*.js', uglify()))
    .pipe(useref())
    .pipe(gulp.dest('dist'))
});
// 
gulp.task('clean', function() {
  del('dist');
});


