var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('browserify');
var watchify = require('watchify');
var fs = require('fs');
var babelify = require('babelify');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var assign = require('lodash.assign')

// Watchify is an extension for browserify
// that keeps tab on what files are changed
// so that browserify doesn't have to waste
// time on recompiling unchanged files.
var customOpts = { debug: true }
var opts = assign({}, watchify.args, customOpts);
var wb = watchify(browserify(opts))

// Add a babelify transform to the
// watchify-browserify object. This
// allows us to use ES6 features in our code,
// and also handles JSX -> JS compilation.
wb.transform(babelify.configure({
  experimental: true,
}))

// add our entry file to the watchify-browserify
// object. Browserify will pull in the rest our
// app files by traversing imports out from app.js
wb.add('./src/app.js')

gulp.task('compile', function() {
  return wb
    .bundle() // do the actual browerify/babelify compilation
    .on('error', function (err) {
      // If browserify fails at compiling,
      // we want that to be forwarded to the browser,
      // or we'll be confused why nothing has changed.
      fs.createWriteStream("build/app.js")
        .write(
          'var errStr = "COMPILATION ERROR! '+err.message+'";' +
          'console.warn(errStr); document.write(errStr)')
      console.warn('Error :', err.message); this.emit('end')
    })
    // write the whole shabang to teh build dir
    .pipe(fs.createWriteStream("build/app.js"))
})

// Handy web server for
gulp.task('webserver', ['compile'] ,function() {
  gulp.src('.')
    .pipe(webserver({

      // webserver has support for livereload but we
      // handle that on our own with gulp-livereload
      livereload: false,

      fallback: 'app.html', // defalt page to serve as root
      open: true // automatically open browser?
    }));
});

// Task that compiles the app,
// starts a webserver, watches app directory for changes,
// and on change recompiles, and tells livereload to reload.
gulp.task('watch', function () {
  runSequence(['compile'], function() {
    livereload.listen()
    gulp.start('webserver')

    watch(['*.html', 'src/**/*.js'], function () {
      runSequence(['compile'], function() {
        livereload.reload('app.html')
      })
    })
  })
})

// The default task when running just "gulp"
// is "watch"
gulp.task('default', ['watch'])
