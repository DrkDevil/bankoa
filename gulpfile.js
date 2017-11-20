'use strict';
// ----- BonsaiApp - Clean Version - Gulp File ------------------------------------------------                                           
// ----- Required Dependecies -----------------------------------------------------------------
var gulp              = require('gulp');
var sass              = require('gulp-sass');
var eslint            = require('gulp-eslint');
var friendlyFormatter = require('eslint-friendly-formatter');
var browserSync       = require('browser-sync');

// ----- Reload BrowserSync -------------------------------------------------------------------
var reload = browserSync.reload;

// ---- Gulp Quick Commands -------------------------------------------------------------------
gulp.task('prod', ['lint', 'build', 'view']);      // gulp prod
gulp.task('dev', ['lint', 'view']);                // gulp dev
gulp.task('default', ['dev']);                     // gulp default

// ---- Sass Compiling ------------------------------------------------------------------------
gulp.task('sass', function() {
 return gulp.src('app/scss/**/*.scss')       // Location of scss files.
   .pipe(sass().on('error', sass.logError))  // Compile Sass, & log errors in terminal.
   .pipe(gulp.dest('app/css/'));              // Put compiled CSS Files in designated folder.
});

// ---- Template Caching ----------------------------------------------------------------------
gulp.task('templates', function() {
 return gulp.src('app/templates/**/*.html')  // Location of your main HTML files.
   .pipe(templateCache({standalone: true}))  // Runs template caching.
   .pipe(gulp.dest('app/scripts'));          // Create template.js in designated folder.
});

// ---- JavaScript Linting (ESlint) -----------------------------------------------------------
gulp.task('lint', function() {
  return gulp.src(['app/scripts/**/*.js',          // Location of js files you want to lint. 
				   '!app/scripts/templates.js'])   // Use !foldername/filename to ignore files. 
    .pipe(eslint('.eslintrc.json'))                // Your eslint pipe (config file) 
    .pipe(eslint.format(friendlyFormatter));       // A better way to dispay errors. 
});

// ---- BrowserSync Config --------------------------------------------------------------------
gulp.task('view', [], function() {
  browserSync({
    notify: false,            // Enable or Disables the 'BrowserSync is running' notification
    logPrefix: 'Bank of America Coding Project - Grocery List',   // Name you want displayed in your console log's prefix. 
    server: ['./app'],
	// The folder the application is running from.
    // https: true;
	// Run as an https by uncommenting 'https: true'
	// Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.   
  });
  // -- Watch these files, and folders. 
  // -- If there are any changes to saved files reload browser. 
  gulp.watch('app/index.html').on('change', reload);
  gulp.watch('app/templates/**/*.html', ['templates', reload]);
  gulp.watch('app/scripts/**/*.js').on('change', reload);
  gulp.watch('app/styles/**/*.css').on('change', reload);
  gulp.watch('app/scss/**/*.scss', ['sass', reload]);
});