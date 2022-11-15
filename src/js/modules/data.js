export const cssSelData = {
  openCinemaInfoBtn: '.js-open-cinema',
  moviePopup: '.js-movie',
  moviePopupAboutItem: '.js-movie__about-item',
  promo: '.js-promo',
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
    cinemaType: 'movie',
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
    cinemaType: 'movie',
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
    cinemaType: 'tv',
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
    cinemaType: 'movie',
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
    cinemaType: 'movie',
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
    cinemaType: 'tv',
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
    <button class="movie-card__link js-open-cinema" type="button">
      <div class="movie-card__poster-wrap">
        <img class="${cssSelData.cinemaImg.slice(1)} movie-card__poster" src="" alt="" />
        <span class="${cssSelData.cinemaRating.slice(1)} rating"></span>
      </div>
      <div class="movie-card__text-block">
        <h3 class="${cssSelData.cinemaTitle.slice(1)} movie-card__title"></h3>
        <span class="${cssSelData.cinemaRelease.slice(1)} movie-card__year-genre"></span>
      </div>
    </button>
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

  cinemaPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
    <div class="popup js-popup movie js-movie">
      <div class="container movie__container">
        <button class="popup__close" type="button"></button>
        <div class="movie__content">
          <div class="movie__left js-movie__left">
            <div class="movie__poster-wrap">
              <img class="movie__poster js-movie__poster" src="" alt="" />
            </div>
          </div>
          <div class="movie__info">
            <div class="movie__main">
              <div class="movie__title-release">
                <h2 class="movie__title js-movie__title">Название</h2>
                <span class="movie__release js-movie__release">Релиз</span>
              </div>
              <div class="movie__title-original-certification">
                <span class="movie__title-original js-movie__title-original"
                  >Name</span
                ><span class="movie__certification js-movie__certification-title"
                  >?+</span
                >
              </div>
              <p class="movie__overview js-movie__overview">overview</p>
            </div>
            <div class="movie__about">
              <h2 class="movie__about-title">О фильме</h2>
              <ul class="movie__about-list">
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Год производства</span
                  ><span class="movie__about-text js-movie__release-year"
                    >Год релиза</span
                  >
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Страна</span
                  ><span class="movie__about-text js-movie__country">Страна</span>
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Жанр</span
                  ><span class="movie__about-text js-movie__genre">жанр</span>
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Слоган</span
                  ><span class="movie__about-text js-movie__slogan">слоган</span>
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Режиссер</span
                  ><span class="movie__about-text js-movie__directing"
                    >режисёр</span
                  >
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Сценарий</span
                  ><span class="movie__about-text js-movie__writing"
                    >Райан Кондал, Джордж Р.Р. Мартин, Чармэйн Де Грейт</span
                  >
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Продюсер</span
                  ><span class="movie__about-text js-movie__production"
                    >продюсер</span
                  >
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Оператор</span
                  ><span class="movie__about-text js-movie__camera">оператор</span>
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Композитор</span
                  ><span class="movie__about-text js-movie__sound">композитр</span>
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Художник</span
                  ><span class="movie__about-text js-movie__art"
                    >Клер Килнер, Мигель Сапочник, Грег Яйтанс, ...</span
                  >
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Монтаж</span
                  ><span class="movie__about-text js-movie__editing"></span>
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Бюджет</span
                  ><span class="movie__about-text js-movie__budget"></span>
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Сборы</span
                  ><span class="movie__about-text js-movie__revenue"></span>
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Премьера в мире</span
                  ><span class="movie__about-text js-movie__premiere"></span>
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Возрастной рейтинг</span
                  ><span
                    class="movie__about-text movie__about-text_age js-movie__certification"
                    >?+</span
                  >
                </li>
                <li class="movie__about-item js-movie__about-item">
                  <span class="movie__about-heading">Время</span
                  ><span class="movie__about-text js-movie__time">время</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="movie__right">
            <div class="movie__vote">
              <span class="movie__vote-average js-movie__vote-average">8.5</span>
              <div class="movie__vote-count">
                <span class="js-movie__vote-count">4523</span
                ><span> Оценок в TMDB</span>
              </div>
            </div>
            <div class="movie__actors">
              <strong class="movie__actors-title">В главных ролях</strong>
              <ul class="span movie__actors-list js-movie__actors-list"></ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    return overlay;
  },

  trailerPopup(key) {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerHTML = `
    <div class="popup trailer-popup js-popup">
      <div class="container trailer-popup__container">
        <iframe class=" trailer-popup__iframe"
          src="https://www.youtube.com/embed/${key}?autoplay=1&iv_load_policy=3&loop=1&modestbranding=1&rel=0&color=white"
          frameborder="0" allowfullscreen="1">
        </iframe>
      </div>
    </div>`;
    overlay.style.zIndex = 100;
    return overlay;
  },

  trailerBtn(key, name) {
    const trailerBtn = document.createElement('button');
    trailerBtn.className = 'movie__trailer-btn';
    trailerBtn.type = 'button';
    trailerBtn.innerHTML = `
    <div class="movie__trailer-poster-wrap">
      <img class="movie__trailer-poster" src="//i.ytimg.com/vi/${key}/hqdefault.jpg">
      <div class="movie__trailer-play">
        <svg class="movie__trailer-play-icon">
          <use xlink:href="img/sprite.svg#play">
        </svg>
      </div>
    </div>
    <span class="movie__trailer-title">${name}</span>
    `;
    return trailerBtn;
  },

  actorItem(actorName) {
    const actorItem = document.createElement('li');
    actorItem.className = 'movie__actors-item';
    actorItem.textContent = actorName;
    return actorItem;
  },
};
