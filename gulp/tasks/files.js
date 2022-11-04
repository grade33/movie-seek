export const files = () => {
  return global.app.gulp.src(global.app.path.src.files)
    .pipe(global.app.gulp.dest(global.app.path.build.files))
    .pipe(global.app.plugins.browsersync.stream());
};