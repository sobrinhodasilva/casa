const gulp = require('gulp')
const uglify = require('gulp-uglify')
const uglifycss = require('gulp-uglifycss')
const concat = require('gulp-concat')


gulp.task('deps', ['deps.js', 'deps.css', 'deps.fonts'])

gulp.task('deps.js', () => {
  // aponta todos arquivos dependentes js depois rerira toda formatação(minificado),
  //concatena em um unico arquivo  e envia para pasta public objetivo diminuir os tamanhos e quantidade de arquivos a serem
  // baixados pelo usuário final
  return gulp.src([
  //  'node_modules/aws-iot-device-sdk/index.js',
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js',
  ])
    .pipe(uglify())
    .pipe(concat('deps.min.js'))
    .pipe(gulp.dest('public/assets/js'))
})

gulp.task('deps.css', () => {
  return gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/font-awesome/css/font-awesome.min.css',

  ])
    .pipe(uglifycss({"uglyComments": true }))// mantem os comentários para créditos
    .pipe(concat('deps.min.css'))
    .pipe(gulp.dest('public/assets/css'))
})

gulp.task('deps.fonts', () => {
  return gulp.src([
    'node_modules/font-awesome/fonts/*.*',
    'node_modules/bootstrap/fonts/*.*'
  ])
  .pipe(gulp.dest('public/assets/fonts'))
})
