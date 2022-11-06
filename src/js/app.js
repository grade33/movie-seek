import { Slider } from './libs/Slider.js';

import { RenderPage } from './modules/RenderPage.js';

import * as functions from './modules/main.js';

functions.setPaddingStantHeader();
functions.setColorRatingText();
functions.openCloseGenreFilter();
functions.selectGenre();

new Slider('.movie-collection__slider', {
  gap: '20',
  slidePerView: 6,
  speed: 500,
  slidePerGroup: 4,
});

new RenderPage();