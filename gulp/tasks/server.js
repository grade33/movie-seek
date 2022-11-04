export const server = () => {
  global.app.plugins.browsersync.init({
    server: {
      baseDir: `${global.app.path.build.markup}`
    },
    notify: false,
    port: 3000,
  });
};