import webpack from 'webpack';
import webpackStream from 'webpack-stream';

export const scripts = () => {
  return global.app.gulp.src(global.app.path.src.scripts)
    .pipe(webpackStream({
      mode: global.app.isBuild ? 'production' : 'development',
      output: {
        filename: 'app.min.js'
      },
      devtool: global.app.isDev ? 'source-map' : false,
      module: {
        rules: [{
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }]
      },
    }), webpack)
    .pipe(global.app.gulp.dest(global.app.path.build.scripts))
    .pipe(global.app.plugins.browsersync.stream());
};
