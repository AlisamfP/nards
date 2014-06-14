//include gulp
var gulp = require('gulp');

//include gulp plugins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-html');
var newer = require('gulp-newer');
var add = require('gulp-add');
var jsonminify = require('gulp-jsonminify');

//include rimraf
var rimraf = require('rimraf');
//general paths
var paths = {
    scripts: ['./src/scripts/*.js'],
    images: ['./src/images/**/*'],
    styles: ['./src/styles/*.css']
};

//jsonminify minify all json and pass to build/scripts
gulp.task('jsonminify', function() {
    return gulp.src(['./src/scripts/*.json'])
        .pipe(jsonminify())
        .pipe(gulp.dest('./build/scripts'))
});

//Task - gulp-add jpg files
gulp.task('add', function() {
    return gulp.src(['./src/images/*.jpg'])
        .pipe(add('*.jpg', 'This is first file content'))
        .pipe(gulp.dest('./build/images'));
});

//JShint Task
gulp.task('jshint', function() {
    return gulp.src('.src/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

});

// minify new images
gulp.task('imagemin', function() {
    var imgSrc = './src/images/**/*',
        imgDst = './build/images';

    return gulp.src(imgSrc)
        .pipe(newer(imgDst))
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// minify new or changed HTML pages
gulp.task('htmlpage', function() {
    var htmlSrc = './src/*.html',
        htmlDst = './build';

    return gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    return gulp.src(['./src/scripts/lib.js', './src/scripts/*.js'])
        .pipe(concat('all.min.js'))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest('./build/scripts/'));
});

// CSS concat, auto-prefix and minify
gulp.task('styles', function() {
    return gulp.src(['./src/styles/*.css'])
        .pipe(concat('styles.css'))
        .pipe(autoprefix('last 2 versions'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./build/styles/'));
});

// default gulp task
gulp.task('default', ['imagemin', 'htmlpage', 'scripts', 'styles'], function() {
    // watch for HTML changes
    gulp.watch('./src/*.html', function() {
        gulp.run('htmlpage');
    });

    // watch for JS changes
    gulp.watch('./src/scripts/*.js', function() {
        gulp.run('jshint', 'scripts');
    });

    //watch for JSON changes
    gulp.watch('./src/scripts/*.json', function() {
        gulp.run('jsonminify');
    });

    // watch for CSS changes
    gulp.watch('./src/styles/*.css', function() {
        gulp.run('styles');
    });

});