export function setPaddingStantHeader() {
  const content = document.querySelector('.content-container');
  const header = document.querySelector('.header');
  const aside = document.querySelector('.aside');
  content.style.marginTop = header.offsetHeight + 'px';
  aside.style.top = header.offsetHeight + 'px';
}

export function openCloseGenreFilter() {
  document.addEventListener('click', (e) => {
    const genreListActive = document.querySelector('.movie-list__filter-list_active');
    const genre = e.target.closest('.movie-list__filter');
    const genreBtn = e.target.closest('.js-filter__btn');
    const genreText = e.target.closest('.js-filter__text');
    
    if((genreListActive && !genre) || (genreListActive && genreBtn || genreText)) {
      genreListActive.classList.remove('movie-list__filter-list_active');
      genreListActive.addEventListener('transitionend', hideElem);
      return;
    }
    function hideElem() {
      genreListActive.hidden = true;
      genreListActive.style.top = '';
      genreListActive.style.bottom = '';
      genreListActive.removeEventListener('transitionend', hideElem);
    }
    

    if(!genreBtn) return;

    const genreList = genre.querySelector('.movie-list__filter-list');
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

export function delegate(box, eventName, selector, handler) {
  box.addEventListener(eventName, (e) => {
    const elem = e.target.closest(selector);
    if (!elem) return;

    handler.call(elem, e);
  });
}