// function tarea(cb) {
//     console.log("mi primer tarea")
    
//    cb() 
// }

// exports.tarea=tarea;
const {src,dest, watch, parallel}=require("gulp"); //!src sirve para identificarlo y dest para guardarlo

//! CSS
const sass=require("gulp-sass")(require('sass'));
const plumber=require("gulp-plumber")
const autoprefixer=require("autoprefixer")
const cssnano=require("cssnano")
const postcss=require("gulp-postcss")
const sourcemaps=require("gulp-sourcemaps")


//! Imagenes
const cache=require("gulp-cache")
const imagemin=require("gulp-imagemin")
const webp=require("gulp-webp")
const avif=require("gulp-avif")

//!JS
const terser=require("gulp-terser-js")

function css(cb){
src('src/scss/**/*.scss') //*identificar el archivo SASS
    .pipe(sourcemaps.init())
    .pipe(plumber()) //*plumber para no detener el workflow
    .pipe(sass())//*compilarlo
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write("."))
    .pipe(dest('build/css')); //*Almacenarla en el disco

//*el pipe es una accion que se realiza despues de otra

    cb() //!callback para que termine la tarea
}
function versionWebp(cb) {

    const opciones={
        qualty:50
    }
    src("src/scss/img/**/*.{png,jpg}")
    .pipe(webp(opciones))
    .pipe(dest("build/img"))
    cb()
}
function imagenes(cb) {
    const opciones={
        optimizationLevel:3
    }
    src("src/scss/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest("build/img"))

    cb()
}
function versionAvif(cb) {

    const opciones={
        qualty:50
    }
    src("src/scss/img/**/*.{png,jpg}")
    .pipe(avif(opciones))
    .pipe(dest("build/img"))
    cb()
}
function javascript(cb) {
    src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(dest("build/js"));
    cb();
}

function dev (cb){
    watch('src/scss/**/*.scss',css);
    watch('src/js/**/*.js',javascript);


    cb()
}


exports.css=css;
exports.javascript=javascript
exports.imagenes=imagenes;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif;
exports.dev=parallel(javascript,dev);
// exports.dev=parallel(imagenes,versionWebp,versionAvif,dev,javascript) ;
