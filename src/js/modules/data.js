export const cssSelData = {
  navLink: '.js-nav__link',
  pageTitle: '.js-page-title',
  nav: '.js-nav',
  main: '.js-main',
  section: '.js-section',
  sectionScrollbar: '.js-section_scrollbar',
  sectionCatalog: '.js-section_catalog',
  sectionTitle: '.js-section__title',
  sectionCinemaList: '.js-section__cinema-list',
  cinemaTitle: '.js-cinema-card__title',
  cinemaRelease: '.js-cinema-card__release',
  cinemaImg: '.js-cinema-card__img',
  cinemaRating: '.js-cinema-card__rating',
  pagination: '.js-pagination',
  paginationBtn: '.js-pagination__btn',
  paginationBtnPrev: '.js-pagination__btn_prev',
  paginationBtnNext: '.js-pagination__btn_next',
  genre: '.js-genre',
  genreBtnOpen: '.js-genre__btn-open',
  genreBtn: '.js-genre__btn',
};

export const apiData = {
  APIKey: '?api_key=c6f47a5e59ca4c3c897aaef4440a616c',
  baseURL: 'https://api.themoviedb.org/3',
  imgBaseURL: 'https://image.tmdb.org/t/p',
  imgFileSize: {
    original: '/original',
    w500: '/w500',
  },
};

export const pageData = {
  pageMain: ['new', 'popular', 'serial', 'cartoon'],
  pageFilm: ['catalogFilm', 'new', 'popular'],
  pageSerial: ['catalogSerial', 'new', 'popular'],
};

export const sectionData = {
  new: {
    name: 'new',
    type: 'scrollbar',
    title: 'Новинки',
    request: {
      typeDiscover: '/discover/movie',
      querySetting:
        '&language=ru&primary_release_date.lte=2022-08-10&primary_release_date.gte=2022-06-10',
      page: 1,
    },
  },
  popular: {
    name: 'popular',
    type: 'scrollbar',
    title: 'Популярное',
    request: {
      typeDiscover: '/discover/movie',
      querySetting: '&language=ru',
      page: 1,
    },
  },
  serial: {
    name: 'serial',
    type: 'scrollbar',
    title: 'Сериалы',
    request: {
      typeDiscover: '/discover/tv',
      querySetting: '&language=ru',
      page: 1,
    },
  },
  cartoon: {
    name: 'cartoon',
    type: 'scrollbar',
    title: 'Мультфильмы',
    request: {
      typeDiscover: '/discover/movie',
      querySetting:
        '&language=ru&with_genres=16&certification_country=US&certification=G',
      page: 1,
    },
  },
  catalogFilm: {
    name: 'catalogFilm',
    type: 'catalog',
    title: 'Лучшие фильмы',
    request: {
      typeDiscover: '/discover/movie',
      typeGenre: '/genre/movie/list',
      querySetting: '&language=ru',
      genreId: null,
      page: 1,
    },
  },
  catalogSerial: {
    name: 'catalogSerial',
    type: 'catalog',
    title: 'Лучшие сериалы',
    request: {
      typeDiscover: '/discover/tv',
      typeGenre: '/genre/tv/list',
      querySetting: '&language=ru',
      genreId: null,
      page: 1,
    },
  },
};

export const htmlData = {
  sectionScrollbar(sectionName) {
    const sectionElem = document.createElement('section');
    sectionElem.dataset.sectionName = sectionName;
    sectionElem.className = `scrollbar ${cssSelData.section.slice(1)}`;
    sectionElem.innerHTML = `
    <div class="container scrollbar__container">
    <h2 class="${cssSelData.sectionTitle.slice(1)} section-title"></h2>
    <div class="slider scrollbar__slider">
      <button class="slider__btn slider__btn_prev" type="button">
        <svg>
          <use xlink:href="./img/sprite.svg#chevron"></use>
        </svg>
      </button>
      <button class="slider__btn slider__btn_next" type="button">
        <svg>
          <use xlink:href="./img/sprite.svg#chevron"></use>
        </svg>
      </button>
      <ul class="${cssSelData.sectionCinemaList.slice(1)} slider__wrapper"></ul>
    </div>
    </div>
    `;
    return sectionElem;
  },

  sectionCatalog(sectionName) {
    const sectionElem = document.createElement('section');
    sectionElem.dataset.sectionName = sectionName;
    sectionElem.className = `catalog ${cssSelData.section.slice(1)}`;
    sectionElem.innerHTML = `
        <div class="container catalog__container">
          <h2 class="${cssSelData.sectionTitle.slice(1)} section-title"></h2>
          <div class="catalog__filter">
            <button class="${cssSelData.genreBtnOpen.slice(
              1
            )} catalog__filter-btn" type="button">
              Выберите жанр
              <svg>
                <use xlink:href="./img/sprite.svg#filter"></use>
              </svg>
            </button>
            <ul class="${cssSelData.genre.slice(1)} catalog__filter-list" hidden="hidden">
            </ul>
          </div>
          <div class="catalog__movies">
            <ul class="${cssSelData.sectionCinemaList.slice(1)} catalog__list">
            </ul>
            <div class="${cssSelData.pagination.slice(1)} pagination">
            </div>
          </div>
        </div>
    `;
    return sectionElem;
  },

  cinemaCard(slide = false) {
    const movieCardElem = document.createElement('li');
    movieCardElem.className = 'movie-card';
    if (slide) movieCardElem.classList.add('slider__slide');

    movieCardElem.innerHTML = `
    <a class="movie-card__link" href="#">
      <div class="movie-card__poster-wrap">
        <img class="${cssSelData.cinemaImg.slice(1)} movie-card__poster" src="" alt="" />
        <span class="${cssSelData.cinemaRating.slice(1)} rating"></span>
      </div>
      <div class="movie-card__text-block">
        <h3 class="${cssSelData.cinemaTitle.slice(1)} movie-card__title"></h3>
        <span class="${cssSelData.cinemaRelease.slice(1)} movie-card__year-genre"></span>
      </div>
    </a>
    `;

    return movieCardElem;
  },

  paginationBtn(value, activeValue = null) {
    const paginationBtnElem = document.createElement('button');
    paginationBtnElem.type = 'button';
    paginationBtnElem.className = 'pagination__btn';

    if (value === 'prev' || value === 'next') {
      if (value === 'prev') {
        paginationBtnElem.classList.add(cssSelData.paginationBtnPrev.slice(1));
        paginationBtnElem.classList.add('pagination__btn_prev');
      } else if (value === 'next') {
        paginationBtnElem.classList.add(cssSelData.paginationBtnNext.slice(1));
        paginationBtnElem.classList.add('pagination__btn_next');
      }

      paginationBtnElem.innerHTML = `
      <svg class="pagination__btn-icon">
        <use xlink:href="./img/sprite.svg#chevron">
      </svg>
      `;
    } else {
      if (value === activeValue)
        paginationBtnElem.classList.add('pagination__btn_active');
      if (isFinite(value))
        paginationBtnElem.classList.add(cssSelData.paginationBtn.slice(1));
      paginationBtnElem.dataset.paginationBtn = value;
      paginationBtnElem.textContent = value;
    }

    return paginationBtnElem;
  },

  genreItem() {
    const genreItemELem = document.createElement('li');
    genreItemELem.className = 'catalog__filter-item';
    genreItemELem.innerHTML = `
      <button class="${cssSelData.genreBtn.slice(
      1
    )} catalog__filter-genre" type="button"></button>
      `;
    return genreItemELem;
  },

  genre(genreName) {
    return `<span class="section-title_cyan">${genreName}</span>`;
  },
};
