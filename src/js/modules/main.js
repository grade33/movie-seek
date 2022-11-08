export function setPaddingStantHeader() {
  const content = document.querySelector('.content-container');
  const header = document.querySelector('.header');
  const aside = document.querySelector('.aside');
  content.style.marginTop = header.offsetHeight + 'px';
  aside.style.top = header.offsetHeight + 'px';
}

export function openCloseGenreFilter() {
  document.addEventListener('click', (e) => {
    const genre = e.target.closest('.movie-list__filter');
    const genreBtn = e.target.closest('[data-pattern="filter-btn"]');
    const genreList = genre?.querySelector('.movie-list__filter-list');
    if (genreList?.classList?.contains('movie-list__filter-list_active')) {
      genreList.classList.remove('movie-list__filter-list_active');
      genreList.addEventListener('transitionend', hideElem);
      return;
    }
    if (!genreBtn) return;

    function hideElem() {
      genreList.hidden = true;
      genreList.style.top = '';
      genreList.style.bottom = '';
      genreList.removeEventListener('transitionend', hideElem);
    }

    genreList.hidden = false;

    const coords = genreBtn.getBoundingClientRect();
    if (document.documentElement.clientHeight - coords.bottom <= genreList.offsetHeight && coords.top >= genreList.offsetHeight) {
      genreList.style.bottom = '100%';
    } else {
      genreList.style.top = '100%';
    }

    genreList.classList.add('movie-list__filter-list_active');
  });
}
