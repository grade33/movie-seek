import webp from 'gulp-webp';

export const images = () => {
  return global.app.gulp.src(global.app.path.src.images)
    .pipe(global.app.plugins.newer(global.app.path.build.images))
    .pipe(global.app.plugins.if(global.app.isBuild, webp()))
    .pipe(global.app.plugins.if(global.app.isBuild, global.app.gulp.dest(global.app.path.build.images)))
    .pipe(global.app.plugins.if(global.app.isBuild, global.app.gulp.src(global.app.path.src.images)))
    .pipe(global.app.plugins.if(global.app.isBuild, global.app.plugins.newer(global.app.path.build.images)))
    .pipe(global.app.gulp.dest(global.app.path.build.images))
    .pipe(global.app.gulp.src(global.app.path.src.svg))
    .pipe(global.app.gulp.dest(global.app.path.build.images))
    .pipe(global.app.plugins.browsersync.stream());
};