//connection plagins

let gulp = require('gulp');
let sass = require('gulp-sass');
let browserSync = require('browser-sync');
let concat = require('gulp-concat');//для конкатенации (объединения) файлов
let uglify = require('gulp-uglifyjs');//для сжатия файлов js
let cssnano = require('gulp-cssnano');//для сжатия css файлов
let rename = require('gulp-rename');//переименование css (добавление префикса min)
let del = require('del');//подключаем библиотеку для удаления файлов и папок
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let cache = require('gulp-cache');//Подключаем cache
let autoprefixer = require('gulp-autoprefixer');//Подключаем autoprefixer
let babel = require('gulp-babel');//Подключаем babel ( babel - это транспайлер, переписывающий код на ES-2015(ES6) в код на предыдущем стандарте ES5.
let cssScss = require('gulp-css-scss'); //Подключаем конвертер gulp-css-scss
let cssImport = require('gulp-cssimport');

//browser-sync task
gulp.task('browser-sync', function(){
  browserSync({//выполняем browser-sync
    server: {//определяем параметры сервера
      baseDir: 'app' //директория для сервера - app
    },
    notify: false //отключаем уведомления
  });
});

//compilation task
gulp.task('sass', function(){
  return gulp.src('app/sass/**/*.scss')//берем файл scss
  .pipe(sass())//применяем плагин gulp-sass(т.е. преобразуем наш SCSS в CSS)
  .pipe(autoprefixer(['last 15 versions', '>1%',], {cascade: true}))
  .pipe(gulp.dest('app/css'))//помещаем результат преобразования в данную директорию
  .pipe(browserSync.reload({stream: true}))//обновляем СSS на странице
});

//concat & uglifyjs task

gulp.task('scripts', function(){
  return gulp.src(['app/js/libs.js', 'node_modules/swiper/dist/js/swiper.min.js'])//берем нужные нам js файлы
  .pipe(concat('libs.min.js'))//собираем их в один файл libs.min.js
  .pipe(babel({
            presets: ['@babel/env'],
			compact: false //переписывает код с ES6 на ES5;
        }))
  .pipe(uglify())//сжимаем его
  .pipe(gulp.dest('app/js'))//помещаем в данную директорию
  .pipe(browserSync.reload({stream: true}))//обновляем страницу
});

//css tasks

/*gulp.task('csslibs',['sass'], function(){
  return gulp.src('app/css/libs.css')//выбираем файл для минификации
  .pipe(cssnano())//сжимаем
  .pipe(rename({suffix:'.min'}))//добавляем суффикс min
  .pipe(gulp.dest('app/css'));//выгружаем его в заданную директорию
});*/

//convert from css to scss task

/*gulp.task('css-scss', () => {
	return gulp.src('node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css') //берем файл, который надо переконвертировать
	.pipe(cssScss()) //конвертируем
	.pipe(gulp.dest('app/sass/general')); //помещаем переконвертированный файл в нужную директорию
	
});*/

//css import

/*gulp.task('css-import', () => {
	return gulp.src('node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css')
	.pipe(cssImport())
	.pipe(gulp.dest('app/css/'))
});*/

//watch task

gulp.task('watch', ['browser-sync','sass', 'scripts'], function(){
  gulp.watch('app/sass/**/*.scss', ['sass'])//наблюдаем за SCSS файлом, после его изменения компилируем
  gulp.watch('app/.html', browserSync.reload)// наблюдение за html, после изменения обновляем браузер
  gulp.watch('app/js/**/*.js', ['scripts']);// наблюдение за js, после изменения обновляем браузер
});

//task удаления папки dist

gulp.task('clean', function(){
  return del.sync('dist');//удаляем папку dist перед сборкой
});

//task для сжатия изображений на продакшен
gulp.task('img', function(){
  return gulp.src('app/img/**/*')//берем все файлы из папки img
  //сжимаем изображения с наилучшим качеством
  .pipe(cache(imagemin({
    interlaced: true,
    progressive: true,
    svgPlugins: [{remomveViewBox: false}],
    use: [pngquant()]
  })))
  //выгружаем в продакшен в папку img
  .pipe(gulp.dest('dist/img'));
});

//task сборки проекта в папку продакшена

gulp.task('build', ['clean', 'img'], function(){
  //переносим css стили в папку продакшена
  let buildCss = gulp.src('app/css/**/*.css')
  .pipe(gulp.dest('dist/css'))
  //переносим шрифты в папку продакшена
  let buildFonts = gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
  //переносим скрипты в папку продакшена
  let buildJs = gulp.src('app/js/**/*')
  .pipe(gulp.dest('dist/js'))
  //переносим index в папку продакшена
  let buildHtml = gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
});

//default task (watch)

gulp.task('default', ['watch']);

//очистка кэша

gulp.task('caсheclear', function(){
  return cache.clearAll();
})
