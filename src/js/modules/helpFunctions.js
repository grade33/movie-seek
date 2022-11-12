import { cssSelData, apiData } from './data.js';

export function delegate(box, eventName, selector, handler) {
  box.addEventListener(eventName, (e) => {
    const elem = e.target.closest(selector);
    if (!elem) return;

    handler.call(elem, e);
  });
}

export function setPaddingStantHeader() {
  const content = document.querySelector('.content-container');
  const header = document.querySelector('.header');
  const aside = document.querySelector('.aside');
  content.style.marginTop = header.offsetHeight + 'px';
  aside.style.top = header.offsetHeight + 'px';
}

export function openCloseGenreFilter() {
  document.addEventListener('click', (e) => {
    const genreListActive = document.querySelector('.catalog__filter-list_active');
    const genre = e.target.closest('.catalog__filter');
    const genreBtn = e.target.closest(cssSelData.genreBtnOpen);
    const genreText = e.target.closest(cssSelData.genreBtn);

    if ((genreListActive && !genre) || (genreListActive && genreBtn) || genreText) {
      genreListActive.classList.remove('catalog__filter-list_active');
      genreListActive.addEventListener('transitionend', hideElem);
      return;
    }
    function hideElem() {
      genreListActive.hidden = true;
      genreListActive.style.top = '';
      genreListActive.style.bottom = '';
      genreListActive.removeEventListener('transitionend', hideElem);
    }

    if (!genreBtn) return;

    const genreList = genre.querySelector('.catalog__filter-list');
    genreList.hidden = false;
    genreList.style.top = '100%';

    genreList.classList.add('catalog__filter-list_active');
  });
}

export async function getRequestData({
  queryType,
  querySetting = '',
  genreId = false,
  page = 1,
}) {
  const settingPage = `&page=${page}`;
  let settingGenre = genreId ? `&with_genres=${genreId}` : '';

  const request = `${apiData.baseURL}${queryType}${apiData.APIKey}${querySetting}${settingGenre}${settingPage}`;
  const response = await fetch(request);
  const data = await response.json();

  return data;
}
