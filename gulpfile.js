const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const sourcemaps = require('gulp-sourcemaps')
const clean = require('gulp-clean')
const kit = require('gulp-kit')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

const paths = {
	sass: './src/sass/**/*.scss',
	sassDist: './dist/css',
	js: './src/js/**/*.js',
	jsDist: './dist/js',
	img: './src/img/*',
	imgDist: './dist/img',
	dist: './dist',
	html: './html/**/*.kit',
}
function handleKits(done) {
	src(paths.html)
	.pipe(kit())
	.pipe(dest('./'))
	done()
}

function sassCompiler(done) {
	src(paths.sass)
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(rename({ suffix: '_min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.sassDist))
	done()
}
function jsCompiler(done) {
	src(paths.js)
		.pipe(sourcemaps.init())
		.pipe(babel({ presets: ['@babel/env'] }))
		.pipe(uglify())
		.pipe(rename({ suffix: '_min' }))
		.pipe(sourcemaps.write())
		.pipe(dest(paths.jsDist))
	done()
}
function imgCompiler(done) {
	src(paths.img)
		.pipe(imagemin())
		.pipe(rename({ suffix: '_min' }))
		.pipe(dest(paths.imgDist))
	done()
}
function startBrowserSync(done) {
	browserSync.init({
		server: {
			baseDir: './',
		},
	})
	done()
}
function wachBrowserSync(done) {
	watch('./*.html').on('change', reload)
	watch([paths.html, paths.sass, paths.js], parallel(handleKits, sassCompiler, jsCompiler)).on('change', reload)
	watch(paths.img, imgCompiler).on('change', reload)
	done()
}
function cleanStuff(done) {
	src(paths.dist, { read: false })
	.pipe(clean())
	done()
}

const mainFuction = parallel(handleKits, sassCompiler, jsCompiler, imgCompiler)
exports.default = series(mainFuction, startBrowserSync, wachBrowserSync)
exports.cleanStuff = cleanStuff
