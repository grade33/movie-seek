import webpack from "webpack";
import webpackStream from 'webpack-stream';
import webpackConfig from '../../webpack.config.js';

export const scripts = () => {
  return app.gulp.src(app.path.src.scripts)
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(app.gulp.dest(app.path.build.scripts))
    .pipe(app.plugins.browsersync.stream())
}