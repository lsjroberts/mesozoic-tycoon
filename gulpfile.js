var gulp = require('gulp'),
    glob = require('glob'),
    path = require('path'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    transform = require('vinyl-transform'),
    exorcist = require('exorcist'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    typescript = require('gulp-typescript');

gulp.task('compile', function() {
    var tsProject = typescript.createProject({
        declarationFiles: true,
        noExternalResolve: true,
        target: 'ES5',
        module: 'commonjs',
        sourceRoot: './src'
    });

    var tsResult = gulp.src(['./src/**/*.ts', './node_modules/awayjs-**/build/*.d.ts'])
        .pipe(sourcemaps.init())
        .pipe(typescript(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write({sourceRoot: './'}))
        .pipe(gulp.dest('./build'));
});

gulp.task('watch', ['package'], function() {
    gulp.watch('./src/**/*.ts', ['package']);
});

gulp.task('package', ['compile'], function(){
    var b = browserify({
        debug: true,
        entries: './build/main.js'
    });

    return b.bundle()
        .pipe(exorcist('./dist/main.js.map'))
        .pipe(source('main.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('package-min', ['package'], function(callback){
    return gulp.src('./dist/js/**/*.js')
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(uglify({compress:false}))
        .pipe(sourcemaps.write({sourceRoot:'./'}))
        .pipe(transform(function() { return exorcist('./dist/main.js.map'); }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('package-awayjs', function(callback){
    var b = browserify({
        debug: true,
        paths: ['../']
    });

    glob('./node_modules/awayjs-**/lib/**/*.js', {}, function (error, files) {

        files.forEach(function (file) {
            b.require(file, {expose:path.relative('./node_modules/', file.slice(0,-3))});
        });

        b.bundle()
            .pipe(exorcist('./dist/awayjs-dist-require.js.map'))
            .pipe(source('awayjs-dist-require.js'))
            .pipe(gulp.dest('./dist/'))
            .on('end', callback);
    });
});

gulp.task('package-awayjs-min', ['package-awayjs'], function(callback){
    return gulp.src('./bin/js/awayjs-dist-require.js')
        .pipe(sourcemaps.init({loadMaps:true}))
        .pipe(uglify({compress:false}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./bin/js'));
});

gulp.task('default', ['package']);
