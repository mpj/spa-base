var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var watchify = require('watchify');
var fs = require('fs');
var babelify = require('babelify');
var exec = require('child_process').exec;
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var assign = require('lodash.assign')

var customOpts = { debug: true }
var opts = assign({}, watchify.args, customOpts);
var wb = watchify(browserify(opts))

wb.transform(babelify.configure({
  experimental: true,
}))
.add('./src/app.js')

gulp.task('compile', function() {
  return wb

    .bundle()
    .on("error", function (err) {
      var error = "Error : " + err.message

      fs.createWriteStream("build/app.js")
        .write(
          'var errStr = "COMPILATION ERROR! '+error+'";' +
          'console.warn(errStr); document.write(errStr)')

      console.warn(error); this.emit('end')

    })
    .pipe(fs.createWriteStream("build/app.js"))
})

gulp.task('webserver', ['compile'] ,function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: false,
      fallback: 'app.html',
      open: true
    }));
});

gulp.task('watch', function () {
  livereload.listen();
  watch(['*.html', 'src/*.js*'], function () {
    runSequence(['compile'], function() {
      livereload.reload('app.html')
    })
  })
  gulp.start('webserver');
})



gulp.task('default', ['compile' ])
