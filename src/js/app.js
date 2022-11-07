import { RenderPage } from './modules/RenderPage.js';
import * as functions from './modules/main.js';

functions.setPaddingStantHeader();
functions.setColorRatingText();
functions.openCloseGenreFilter();
functions.selectGenre();

new RenderPage();