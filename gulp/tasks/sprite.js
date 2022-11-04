import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';

export const sprite = () => {
  return global.app.gulp.src(global.app.path.src.sprite)
    .pipe(svgmin({
        js2svg: {
          pretty: true,
          indent : 2 ,
        },
      })
    )
    .pipe(cheerio({
        run: function ($) {
          $('[style]').removeAttr('style');
        },
        parserOptions: {
          xmlMode: true
        },
      })
    )
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg',
        }
      }
    }))
    .pipe(global.app.gulp.dest(global.app.path.build.images))
    .pipe(global.app.plugins.browsersync.stream());
};