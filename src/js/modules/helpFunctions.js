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

export async function fillPromoContent(selector, movieId, cinemaType) {
  const promo = document.querySelector(selector);
  const title = promo.querySelector(`${selector}__title`);
  const desc = promo.querySelector(`${selector}__overview`);
  const staring = promo.querySelector(`${selector}__staring`);
  const director = promo.querySelector(`${selector}__director`);
  const poster = promo.querySelector(`${selector}__poster`);
  const rating = promo.querySelector(`${selector}__rating`);

  const mainQueryType = `/${cinemaType}/${movieId}`;
  const creditsQueryType = `${mainQueryType}/credits`;
  const querySetting = '&language=ru';

  const mainData = await getRequestData({
    queryType: mainQueryType,
    querySetting: querySetting,
  });
  const creditsData = await getRequestData({
    queryType: creditsQueryType,
    querySetting: querySetting,
  });

  title.textContent = mainData.title || mainData.name;
  desc.textContent = mainData.overview;
  for (const person of creditsData.cast) {
    staring.textContent += `${person.name}, `;
  }
  for (const person of creditsData.crew) {
    if (person.known_for_department === 'Directing') {
      director.textContent += `${person.name}, `;
    }
  }
  poster.src = apiData.imgBaseURL + apiData.imgFileSize.original + mainData.backdrop_path;
  poster.alt = mainData.title || mainData.name;
  rating.textContent = mainData.vote_average;
  setRatingColor(rating);
}

export async function getRequestData({
  queryType,
  querySetting = '',
  genreId = false,
  page = false,
}) {
  const settingPage = page ? `&page=${page}` : '';
  let settingGenre = genreId ? `&with_genres=${genreId}` : '';

  const request = `${apiData.baseURL}${queryType}${apiData.APIKey}${querySetting}${settingGenre}${settingPage}`;

  const response = await fetch(request);
  const data = await response.json();

  return data;
}

export function setRatingColor(ratingEl) {
  ratingEl.textContent = Number(ratingEl.textContent).toFixed(1);
  if (+ratingEl.textContent === 0) ratingEl.remove();
  else if (+ratingEl.textContent >= 7) ratingEl.style.background = '#007b00';
  else if (+ratingEl.textContent < 5) ratingEl.style.background = '#ff0b0b';
}
