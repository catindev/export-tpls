var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    merge = require('merge-stream'),
    browserSync = require('browser-sync'),
    sourcemaps = require('gulp-sourcemaps'),
    plumber = require('gulp-plumber'),
    include = require('gulp-html-tag-include'),
    mainBowerFiles = require('main-bower-files'),
    gulpFilter = require('gulp-filter'),
    ftp = require('gulp-ftp'),
    notify = require('gulp-notify');



gulp.task('html', function() {
    return gulp.src(['./src/pages/html/**', '!./src/pages/components/'])
        .pipe(include())
        .pipe(gulp.dest('./public'));
});

gulp.task('bower_components', function() {
    return gulp.src(['src/js/vendor/jquery.js','src/js/vendor/*.js'])
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return{
                    title : 'JS TASK ERROR',
                    message: err.message
                };
            })
        }))
        .pipe(concat('vendor.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.stream());
});


gulp.task('scripts', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return{
                    title : 'JS TASK ERROR',
                    message: err.message
                };
            })
        }))
        //.pipe(uglify())
        .pipe(gulp.dest('./public/js/'))
        .pipe(browserSync.stream());
});



gulp.task('styles', function() {
    return gulp.src(['src/css/*.css', 'src/css/*.scss'])
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return{
                    title : 'CSS TASK ERROR',
                    message: err.message
                };
            })
        }))
        .pipe(concat('app.css'))
        .pipe(sass.sync())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream())
});

gulp.task('bower_components_css', function() {
    return gulp.src(['src/css/vendor/*.css'])
        .pipe(plumber({
            errorHandler: notify.onError(function(err){
                return{
                    title : 'CSS TASK ERROR',
                    message: err.message
                };
            })
        }))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.stream())
});



// Watch
gulp.task('watch',function(){
    gulp.watch("./src/js/*.js", ['scripts']);
    gulp.watch(["./src/css/*.scss", "./src/css/*.css"], ['styles']);
    gulp.watch(['src/pages/**/**.html', 'src/pages/**/**.html'], ['html']);
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "public"
        },
        startPath: "/index.html"
    });
});

gulp.task('build', function () {
    return gulp.src('public/**/*.*')
        .pipe(ftp({
            host: 'test.webmolot.com',
            user: 'webmolot_test',
            pass: 'webtest45molot',
            remotePath: '/agroinfo/'
        }));
});

// Default
gulp.task('default', ['html', 'scripts', 'styles', 'bower_components', 'bower_components_css', 'browser-sync', 'watch']);