var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config')();
var del = require('del');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('build', function () {
	log('Analyzing source with JSHint and JSCS');
	return gulp.src(['./src/**/*.js',
		'./*.js'])
		.pipe($.if(args.verbose, $.print()))
		.pipe($.jscs())
		.pipe($.jshint())
		.pipe($.jshint.reporter('jshint-stylish', { verbsoe: true }))
		.pipe($.jshint.reporter('fail'));
});

gulp.task('styles', function () {
	log('Compiling Less --> CSS');
	return gulp.src(config.less)
		.pipe($.plumber())
		.pipe($.less())
		.pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
		.pipe(gulp.dest(config.temp));
});

gulp.task('clean-styles', function () {
	var files = config.temp + '**/*.css';
	clean(files);
});

gulp.task('less-watcher', function () {
	gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function(){
	var options = config.getWiredDep;
	var wireddep = require('wiredep').stream;
	return gulp.src(config.index)
	.pip(wiredep(options))
	.pipe($.inject(gulp.src(config.js)))
	.pipe(gulp.dest(config.client));
})

function clean(path) {
	log('Cleaning: ' + $.util.colors.yellow(path));
	del(path);
}

function log(msg) {
	if (typeof (msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.blue(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.blue(msg));
	}
}
