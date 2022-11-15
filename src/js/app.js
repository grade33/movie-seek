import { cssSelData } from './modules/data.js';
import { setPaddingStantHeader, handlerOpenCloseGenre, fillPromoContent, handlerRemoveOverlay, openCinemaInfo } from './modules/helpFunctions.js';
import { FillPage } from './classes/FillPage.js';

setPaddingStantHeader();
handlerOpenCloseGenre();
handlerRemoveOverlay();
openCinemaInfo();

fillPromoContent(cssSelData.promo, 94997, 'tv');
new FillPage();