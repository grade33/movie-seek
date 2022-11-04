import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import webpackConfig from '../../webpack.config.js';

export const scripts = () => {
  return global.app.gulp.src(global.app.path.src.scripts, {
      sourcemaps: global.app.isDev
    })
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(global.app.gulp.dest(global.app.path.build.scripts), {
      sourcemaps: global.app.isDev
    })
    .pipe(global.app.plugins.browsersync.stream());
};
