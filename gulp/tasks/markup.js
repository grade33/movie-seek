import pug from 'gulp-pug';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';

export const markup = () => {
  return app.gulp.src(app.path.src.markup)
    .pipe(pug({
      pretty: app.isBuild ? false : true,
    }))
    .pipe(app.plugins.replace(/@img\//g, 'img/'))
    .pipe(webpHtmlNosvg())
    .pipe(app.gulp.dest(app.path.build.markup))
    .pipe(app.plugins.browsersync.stream())
}