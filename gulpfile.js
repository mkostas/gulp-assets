var gulp      = require('gulp'),
    uglify 		= require('gulp-uglify'),
    concat 		= require('gulp-concat'),
    rename  	= require('gulp-rename'),
    minifyCSS = require('gulp-minify-css'),
    flatten 	= require('gulp-flatten'); // gets the absolute path

// concat all js files to scripts.js and minifies to scripts.min.css
gulp.task('js', function () {
	return gulp.src([
   		'wp-includes/**/*.js',
   		'wp-content/**/*.js'
   	])
   	.pipe(concat('scripts.js'))
	// .pipe(uglify())
	// .pipe(rename('scripts.min.js'))
	.pipe(gulp.dest('assets/js'));
});

// concat all css files to style.css then minifies to style.min.css
gulp.task('css',function(){
	return gulp.src([
		'wp-content/**/*.css'
  	])
    .pipe(concat('style.css'))
    // .pipe(minifyCSS())
    // .pipe(rename('style.min.css'))
    .pipe(gulp.dest('assets/css'))
});

// Get all Font files to assets/fonts
gulp.task('fonts', function() {
    return gulp.src([
    	'wp-content/**/fonts/*.{eot,svg,ttf,woff,woff2}',
    	'wp-includes/**/fonts/*.{eot,svg,ttf,woff,woff2}'
    ])
    .pipe(flatten())
    .pipe(gulp.dest('assets/fonts'));
});

// global watcher task to do all the magical stuff
// gulp.task('watch',function(){
// 	gulp.watch('./dev/js/*.js',['lint','js']);
// 	gulp.watch('./dev/css/*.css',['css']);
// });

// gulp default task (runs all individual tasks, then kicks off the watcher task)
gulp.task('default', [
	'js',
	'css',
	'fonts'
	// 'watch'
]);