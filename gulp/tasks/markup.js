import pug from 'gulp-pug';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';

export const markup = () => {
  return global.app.gulp.src(global.app.path.src.markup)
    .pipe(pug({
      pretty: global.app.isBuild ? false : true,
    }))
    .pipe(global.app.plugins.replace(/@img\//g, 'img/'))
    .pipe(global.app.plugins.if(global.app.isBuild, webpHtmlNosvg()))
    .pipe(global.app.gulp.dest(global.app.path.build.markup))
    .pipe(global.app.plugins.browsersync.stream());
};