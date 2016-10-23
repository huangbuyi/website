// generated on 2016-10-12 using generator-webapp 2.2.0
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('myTest', () => {
})

/* 暂时未使用sass */
// gulp.task('styles', () => {
//   return gulp.src('app/styles/*.scss')
//     .pipe($.plumber())
//     .pipe($.sourcemaps.init())
//     .pipe($.sass.sync({
//       outputStyle: 'expanded',
//       precision: 10,
//       includePaths: ['.']
//     }).on('error', $.sass.logError))
//     .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
//     .pipe($.sourcemaps.write())
//     .pipe(gulp.dest('.tmp/styles'))
//     .pipe(reload({stream: true}));
// });

/* 将ES6转为ES5，暂时没使用ES6特性 */
gulp.task('scripts', () => {
  return gulp.src('app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe(reload({stream: true}));
});

/* 转admin文件夹 */
gulp.task('scriptsAdmin', () => {
  return gulp.src('app/admin/scripts/**/*.js')
      .pipe($.plumber())
      .pipe($.sourcemaps.init())
      .pipe($.babel())
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('.tmp/scriptsAdmin'))
      .pipe(reload({stream: true}));
});

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({stream: true, once: true}))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

/* 风格检测 */
gulp.task('lint', () => {
  return lint('app/scripts/**/*.js', {
    fix: true
  })
    .pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js', {
    fix: true,
    env: {
      mocha: true
    }
  })
    .pipe(gulp.dest('test/spec'));
});

/* 压缩文件 */
gulp.task('html', ['scripts'], () => {
  return gulp.src('app/*.html')
      .pipe($.useref({searchPath: ['.tmp/scripts', 'app', '.', './bower_components']}))
      .pipe($.if('*.js', $.uglify()))
      .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
      .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
      .pipe(gulp.dest('dist'));
});

/* 转admin文件夹 */
gulp.task('htmlAdmin', [ 'scriptsAdmin'], () => {
  return gulp.src('app/admin/*.html')
    .pipe($.useref({searchPath: ['.tmp/scriptsAdmin', 'app/admin', '.', './bower_components']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist/admin'));
});

/* 复制admin文件夹的php文件 */
gulp.task('php', () => {
  return gulp.src("app/admin/**/*.php")
       .pipe(gulp.dest('dist/admin'));
});
gulp.task('uploads', () => {
  return gulp.src("app/admin/uploads/**/*")
      .pipe(gulp.dest('dist/admin/uploads'));
});
gulp.task('sql', () => {
  return gulp.src("app/admin/sql/**/*")
      .pipe(gulp.dest('dist/admin/sql'));
});

/* 压缩图片 */
gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/images'));
});
gulp.task('imagesCss', () => {
  return gulp.src('app/styles/images/**/*')
      .pipe($.cache($.imagemin()))
      .pipe(gulp.dest('dist/styles/images'));
});

/* 转admin文件夹 */
gulp.task('imagesAdmin', () => {
  return gulp.src('app/admin/images/**/*')
      .pipe($.cache($.imagemin()))
      .pipe(gulp.dest('dist/admin/images'));
});
gulp.task('imagesCssAdmin', () => {
  return gulp.src('app/admin/styles/images/**/*')
      .pipe($.cache($.imagemin()))
      .pipe(gulp.dest('dist/admin/styles/images'));
});

gulp.task('fonts', () => {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/fonts/**/*'))
    .pipe(gulp.dest('.tmp/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', () => {
  return gulp.src([
    'app/*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('extrasAdmin', () => {
  return gulp.src([
    'app/admin/*',
    '!app/admin/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist/admin'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
  runSequence(['clean', 'wiredep'], ['styles', 'scripts', 'fonts'], () => {
    browserSync({
      notify: false,
      port: 9000,
      server: {
        baseDir: ['.tmp', 'app'],
        routes: {
          '/bower_components': 'bower_components'
        }
      }
    });

    gulp.watch([
      'app/*.html',
        'app/images/**/*',
      '.tmp/fonts/**/*'
    ]).on('change', reload);

    gulp.watch('app/styles/**/*.scss', ['styles']);
      gulp.watch('app/scripts/**/*.js', ['scripts']);
      gulp.watch('app/fonts/**/*', ['fonts']);
    gulp.watch('bower.json', ['wiredep', 'fonts']);
  });
});

gulp.task('serve:dist', () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});


// inject bower components 重新设置
gulp.task('wiredep', () => {
  /* 暂时未使用sass */
  // gulp.src('app/styles/*.scss')
  //   .pipe(wiredep({
  //     ignorePath: /^(\.\.\/)+/
  //   }))
  //   .pipe(gulp.dest('app/styles'));

  gulp.src('app/index.html')
    .pipe(wiredep({

      // 默认bower.json文件包含两个页面的依赖，所以指定一个bowerJSON为单个页面添加依赖
      bowerJson:{
        "dependencies": {
          "jquery": "^3.1.1",
          "masonry": "^4.1.1",
          "imagesloaded": "^4.1.1",
          "jQuery.mmenu": "mmenu#^5.7.4",
          "magnific-popup": "^1.1.0",
          "hammerjs": "hammer.js#^2.0.8"
        },
        "overrides": {
          "masonry": {
            "main": "dist/masonry.pkgd.min.js",    // 选用该文件做主文件，因为原主文件依赖一个项目有错误
            "dependencies": {}      // 该文件不需要其它依赖
          }
        }
      },
      exclude: ['bootstrap-sass'],

      ignorePath: /^(\.\.\/)*\.\./,
      fileTypes: {

        // 将默认路径 '/' 改为 '../'
        html: {
          replace: {
            js: '<script src="' + '..' + '{{filePath}}"></script>',
            css: '<link rel="stylesheet" href="' + '..' + '{{filePath}}" />'
          }
        }
      }
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('wiredepAdmin', () => {

  gulp.src('app/admin/index.html')
      .pipe(wiredep({

        // 默认bower.json文件包含两个页面的依赖，所以指定一个bowerJSON为单个页面添加依赖
        bowerJson:{
          "dependencies": {
            "jquery": "^3.1.1",
            "fine-uploader": "^5.11.8",
            "jQuery.mmenu": "mmenu#^5.7.4",
            "cookies-js": "^1.2.2",
            "magnific-popup": "^1.1.0",
            "datatables.net-jqui": "^1.10.12",
            "jquery-ui": "jquery.ui#^1.12.1",
            "jquery.tagsinput": "xoxco/jQuery-Tags-Input#^1.3.6",
            "hammerjs": "hammer.js#^2.0.8"
          },
          "overrides": {
            "fine-uploader": {
              "main": ["dist/fine-uploader-new.css", "dist/jquery.fine-uploader.js"]    // 选用该文件做主文件
            }
          }
        },
        exclude: ['bootstrap-sass'],

        ignorePath: /^(\.\.\/)*\.\./,
        fileTypes: {

          // 将默认路径 '/' 改为 '../'
          html: {
            replace: {
              js: '<script src="' + '../..' + '{{filePath}}"></script>',
              css: '<link rel="stylesheet" href="' + '../..' + '{{filePath}}" />'
            }
          }
        }
      }))
      .pipe(gulp.dest('app/admin'));
});

gulp.task('build', ['lint', 'html', 'images', 'imagesCss', 'fonts', 'extras'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('buildAdmin', ['htmlAdmin', 'imagesAdmin', 'imagesCssAdmin', 'php', 'uploads', 'sql', 'extrasAdmin'], () => {
  return gulp.src('dist/admin/**/*').pipe($.size({title: 'buildAdmin', gzip: true}));
});

// gulp.task('default', () => {
//   runSequence(['clean'], 'build', 'buildAdmin');
// });

gulp.task('default', () => {
  runSequence(['clean', 'wiredep', 'wiredepAdmin'], 'build', 'buildAdmin');
});
