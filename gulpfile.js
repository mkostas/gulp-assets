// ---------------------------------------------------------------
// Plugins
// ---------------------------------------------------------------

var gulp			= require('gulp'),
	uglify			= require('gulp-uglify'),
	concat			= require('gulp-concat'),
	rename			= require('gulp-rename'),
	cleanCss		= require('gulp-clean-css'),
	flatten			= require('gulp-flatten'), // remove or replace relative path for files
	replace			= require('gulp-replace'), 
	imagemin		= require('gulp-imagemin'),
	pngquant		= require('imagemin-pngquant');


// ---------------------------------------------------------------
// Setting Sources - Destinations
// ---------------------------------------------------------------

// Base Paths
var basePaths = {
	src_A: 'wp-includes/',
	src_B: 'wp-content/',
	dest: 'assets/'
};

// Source Paths
var srcPathsJS = ([
	basePaths.src_A + '**/*.js',
	basePaths.src_B + '**/*.js'
]);

var srcPathsCSS = ([
	basePaths.src_A + '**/*.css',
	basePaths.src_B + '**/*.css'
]);

var srcPathsFonts = ([
	basePaths.src_A + '**/*.{eot,svg,ttf,woff,woff2}',
	basePaths.src_B + '**/*.{eot,svg,ttf,woff,woff2}'
]);

var srcPathsImg = ([
	basePaths.src_A + '**/*.{gif,jpeg,jpg,png}',
	basePaths.src_B + '**/*.{gif,jpeg,jpg,png}'
]);

// Destination Paths
var destPathJS = basePaths.dest + 'js/';
var destPathCSS = basePaths.dest + 'css/';
var destPathFonts = basePaths.dest + 'fonts/';
var destPathImg = basePaths.dest + 'images/';


// ---------------------------------------------------------------
// Error Handler
// ---------------------------------------------------------------

function errorLog(err) {
	console.error(err.toString());
	this.emit('end');
}


// ---------------------------------------------------------------
// Task: dev-js
// ---------------------------------------------------------------

gulp.task('dev-js', function () {
	return gulp.src(srcPathsJS)
	// .pipe(concat('scripts.js'))
	// .pipe(uglify())
	// .pipe(rename('scripts.min.js'))
	.pipe(flatten())
	.on('error', errorLog)
    .pipe(gulp.dest(destPathJS));
});


// ---------------------------------------------------------------
// Task: dev-css
// ---------------------------------------------------------------

gulp.task('dev-css',function(){
	return gulp.src(srcPathsCSS)
	.pipe(concat('style.css'))
	.pipe(cleanCss({debug: true, processImport: false}))
	.pipe(rename('style.min.css'))
	.on('error', errorLog)
	.pipe(gulp.dest(destPathCSS))
});


// ---------------------------------------------------------------
// Task: dev-fonts
// ---------------------------------------------------------------

gulp.task('dev-fonts', function() {
	return gulp.src(srcPathsFonts)
	.pipe(flatten())
	.on('error', errorLog)
	.pipe(gulp.dest(destPathFonts));
});


// ---------------------------------------------------------------
// Task: dev-img
// ---------------------------------------------------------------

gulp.task('dev-img', function() {
	return gulp.src(srcPathsImg)
	.pipe(flatten())
	.pipe(imagemin({
            progressive: false,
            svgoPlugins: [
                {removeViewBox: false},
                {cleanupIDs: false}
            ],
            use: [pngquant()]
        }))
	.on('error', errorLog)
	.pipe(gulp.dest(destPathImg));
});


// ---------------------------------------------------------------
// Task: href-replace
// ---------------------------------------------------------------

gulp.task('hr', function() {
	return gulp.src('index_.html')
    .pipe(replace(/src="([^"]*)"/g, 'src="<?=$_SESSION[\'siteUrl\']?>\'$1\'"'))
    .pipe(replace(/href="([^"]*)"/g, 'href="$$href(\'$1\')"'))
    .on('error', errorLog)
    .pipe(gulp.dest('dist'));
});

// ---------------------------------------------------------------
// Task: Watch
// ---------------------------------------------------------------

// global watcher task to do all the magical stuff
// gulp.task('watch',function(){
// gulp.watch('./dev/js/*.js',['lint','js']);
// gulp.watch('./dev/css/*.css',['css']);
// });


// ---------------------------------------------------------------
// Default
// ---------------------------------------------------------------

gulp.task('default', [
	'dev-js',
	'dev-css',
	'dev-fonts'
	// 'watch'
]);