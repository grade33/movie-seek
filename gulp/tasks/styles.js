import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css';
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const styles = () => {
  return global.app.gulp.src(global.app.path.src.styles, {
      sourcemaps: global.app.isDev
    })
    .pipe(sass({
      includePaths: ['node_modules'],
      outputStyle: 'expanded'
    }))
    .pipe(global.app.plugins.replace(/@img\//g, './img/'))
    .pipe(global.app.plugins.if(global.app.isBuild, groupCssMediaQueries()))
    .pipe(global.app.plugins.if(global.app.isBuild, webpcss({
      webpClass: '.webp',
      noWebpClass: '.no-webp'
    })))
    .pipe(global.app.plugins.if(global.app.isBuild, autoprefixer({
      grid: true,
      cascade: false,
      overrideBrowserslist: ['last 5 versions'],
    })))
    .pipe(global.app.plugins.if(global.app.isBuild, cleanCss({
      level: 2
    })))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(global.app.gulp.dest(global.app.path.build.styles, {
      sourcemaps: global.app.isDev
    }))
    .pipe(global.app.plugins.browsersync.stream());
};
