// ---------------------------------------------------------------
// Plugins
// ---------------------------------------------------------------

var gulp		= require('gulp'),
	uglify		= require('gulp-uglify'),
	// concat		= require('gulp-concat'),
	cleanCss	= require('gulp-clean-css'),
	flatten		= require('gulp-flatten'), // remove or replace relative path for files
	replace		= require('gulp-replace'), 
	imagemin	= require('gulp-imagemin'),
	pngquant	= require('imagemin-pngquant'),
	usemin		= require('gulp-usemin'),
	debug		= require('gulp-debug'),
	beautify	= require('gulp-jsbeautifier'),
	importCss	= require('gulp-import-css');


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
// Task: dev-js
// ---------------------------------------------------------------

// Include in html->CSS and JS sources:
// <!-- build:css css/styles.css -->
// <!-- endbuild -->
// <!-- build:js js/scripts.js -->
// <!-- endbuild -->
gulp.task('dev-assets', function () {
	// return gulp.src(srcPathsJS, {base: './'})
	return gulp.src('index.html')
		.pipe(usemin({
			js: [beautify()],
			css: [beautify(), importCss(), 'concat' ]
		}))
		.pipe(debug())
		.pipe(gulp.dest(basePaths.dest));
});


// ---------------------------------------------------------------
// Task: dev-fonts
// ---------------------------------------------------------------

gulp.task('dev-fonts', function() {
	return gulp.src(srcPathsFonts)
	.pipe(flatten())
	.pipe(debug())
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
	.pipe(debug())
	.pipe(gulp.dest(destPathImg));
});


// ---------------------------------------------------------------
// Task: href-replace
// ---------------------------------------------------------------

// gulp.task('hr', function() {
// 	return gulp.src('index_.html')
//     .pipe(replace(/src="([^"]*)"/g, 'src="<?=$_SESSION[\'siteUrl\']?>\'$1\'"'))
//     .pipe(replace(/href="([^"]*)"/g, 'href="$$href(\'$1\')"'))
//     .pipe(debug())
//     .pipe(gulp.dest('dist'));
// });


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
	'dev-assets',
	'dev-fonts',
	'dev-img'
	// 'watch'
]);