import del from 'del';

export const clean = () => {
  return del(global.app.path.clean);
};