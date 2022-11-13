import { cssSelData } from './modules/data.js';
import { setPaddingStantHeader, openCloseGenreFilter, fillPromoContent } from './modules/helpFunctions.js';
import { FillCinemaContent } from './classes/FillCinemaContent.js';
import { FillPage } from './classes/FillPage.js';

setPaddingStantHeader();
openCloseGenreFilter();

fillPromoContent(cssSelData.promo, 94997, 'tv');
new FillPage();

new FillCinemaContent('.js-movie', 436270, 'movie');
