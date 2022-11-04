import { Slider } from './libs/slider.js';
 import * as functions from './modules/main.js';

new Slider('.movie-collection__slider', {
  gap: '20',
  slidePerView: 5,
  speed: 500,
  slidePerGroup: 3,
});

functions.setPaddingStantHeader();