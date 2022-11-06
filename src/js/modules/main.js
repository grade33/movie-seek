export function setPaddingStantHeader() {
  const content = document.querySelector('.content');
  const header = document.querySelector('.header');
  const aside = document.querySelector('.aside');
  content.style.marginTop = header.offsetHeight + 'px';
  aside.style.top = header.offsetHeight + 'px';
}

export function setColorRatingText() {
  document.querySelectorAll('.rating').forEach(rate => {
    if (+rate.innerHTML > 7) rate.style.background = '#007b00';
    else if (+rate.innerHTML < 5) rate.style.background = '#ff0b0b';
  });
}

export function openCloseGenreFilter() {
  const genre = document.querySelector('.movie-genre__filter');
  const gentrBtn = genre.querySelector('.movie-genre__filter-btn');
  const gentrList = genre.querySelector('.movie-genre__filter-list');

  gentrList.hiddem = true;

  gentrBtn.addEventListener('click', () => {
    if (gentrList.classList.contains('movie-collection__genre-list_active')) {
      gentrList.classList.remove('movie-collection__genre-list_active');
      gentrList.addEventListener('transitionend', hideElem);

      return;
    }

    function hideElem() {
      gentrList.hidden = true;
      gentrList.style.top = '';
      gentrList.style.bottom = '';
      gentrList.removeEventListener('transitionend', hideElem);
    }

    gentrList.hiddem = false;

    const coords = gentrBtn.getBoundingClientRect();
    if (document.documentElement.clientHeight - coords.bottom <= gentrList.offsetHeight && coords.top >= gentrList.offsetHeight) {
      gentrList.style.bottom = '100%';
    } else {
      gentrList.style.top = '100%';
    }

    gentrList.classList.add('movie-collection__genre-list_active');
  });
}

export function selectGenre() {
}
