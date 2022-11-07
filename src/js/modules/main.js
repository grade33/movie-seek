export function setPaddingStantHeader() {
  const content = document.querySelector('.content');
  const header = document.querySelector('.header');
  const aside = document.querySelector('.aside');
  content.style.marginTop = header.offsetHeight + 'px';
  aside.style.top = header.offsetHeight + 'px';
}

export function setColorRatingText() {
  document.querySelectorAll('.rating').forEach((rate) => {
    if (+rate.innerHTML > 7) rate.style.background = '#007b00';
    else if (+rate.innerHTML < 5) rate.style.background = '#ff0b0b';
  });
}

export function openCloseGenreFilter() {
  document.addEventListener('click', (e) => {
    const genreBtn = e.target.closest('.movie-genre__filter-btn');
    if (!e.target.closest('.movie-genre__filter-btn')) return;

    const genre = e.target.closest('.movie-genre__filter');
    const genreList = genre.querySelector('.movie-genre__filter-list');

    if (genreList.classList.contains('movie-genre__filter-list_active')) {
      genreList.classList.remove('movie-genre__filter-list_active');
      genreList.addEventListener('transitionend', hideElem);

      return;
    }

    function hideElem() {
      genreList.hidden = true;
      genreList.style.top = '';
      genreList.style.bottom = '';
      genreList.removeEventListener('transitionend', hideElem);
    }

    genreList.hidden = false;

    const coords = genreBtn.getBoundingClientRect();
    if (
      document.documentElement.clientHeight - coords.bottom <=
        genreList.offsetHeight &&
      coords.top >= genreList.offsetHeight
    ) {
      genreList.style.bottom = '100%';
    } else {
      genreList.style.top = '100%';
    }

    genreList.classList.add('movie-genre__filter-list_active');
  });
}

export function selectGenre() {}
