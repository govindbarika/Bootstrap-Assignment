var gulp = require('gulp');  
var sass = require('gulp-sass');  
var browserSync = require('browser-sync'); 

//compile sass into CSS & auto-inject into browsers
gulp.task('sass', function () {  
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
               .pipe(sass({includePaths: ['scss']}))
               .pipe(gulp.dest('src/css'))
               .pipe(browserSync.stream());
});

//move the javascript files into our /src/js folder
gulp.task('js', function(){
    return gulp.src(['node_modules/bootstrap/dist/js/*.js', 'node_modules/bootstrap/popper.js/dist/umd/*.js'])
                .pipe(gulp.dest("src/js"))
                .pipe(browserSync.stream());
});

//static server + watching scss/html files

gulp.task('serve', ['sass'], function(){
    browserSync.init({
        server:"."
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.html'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['js', 'serve']);