var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var fs = require('fs');
var babelify = require("babelify");
/*var exec = require('child_process').exec;
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');*/

gulp.task('compile', function() {
  return browserify({ debug: true })
    .transform(babelify.configure({
      experimental: true,
    }))
    .add('./src/app.js')
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); this.emit('end') })
    .pipe(fs.createWriteStream("build/app.js"))

})
