var gulp=require('gulp'),
    webserver=require('gulp-webserver'),
    livereload=require('gulp-livereload'),
    sass=require('gulp-ruby-sass'),
    uglify=require('gulp-uglify'),
    rename=require('gulp-rename'),
    imagemin=require('gulp-imagemin'),
    pngquant=require('imagemin-pngquant');
//注册网页打开任务
gulp.task("webserver",function(){
    gulp.src("./src")
        .pipe(webserver({
            livereload:true,
            open:true
        }));
});
//注册html任务
  gulp.task("html",function(){
      return gulp.src('src/**/*.html')
          .pipe(gulp.dest('dist'));
  });
//注册sass任务
 gulp.task("sass",function(){
     return sass('src/sass/*.scss',{style:"compact"})
         .on("error",function(err){
             console.log("编译错误，err.message")
         })
         .pipe(gulp.dest('dist/css'));
 });
 //注册js压缩任务以及重命名任务
 gulp.task("script",function(){
     return gulp.src("src/js/*.js")
         .pipe(rename({suffix:'.min'}))
         .pipe(uglify({preserveComments:'some'}))
         .pipe(gulp.dest('dist/js'));
 });
//注册图片压缩任务
gulp.task("images",function(){
    return gulp.src("src/images/**/*.{png,jpg,gif,svg}")
        .pipe(imagemin({
            progressive:true,
            svgoPlugins:[{removeViewBox:false}],
            use:[pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});
//默认任务
gulp.task("default",["sass","script","images","html","webserver"]);