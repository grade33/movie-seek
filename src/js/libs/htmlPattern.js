export const sectioSlider = (sectionName) => {
  const sectionElem = document.createElement('section');
  sectionElem.dataset.sectionName = sectionName;
  sectionElem.className = 'movie-collection js-section';
  sectionElem.innerHTML = `
  <div class="container movie-collection__container">
  <h2 class="js-title section-title"></h2>
  <div class="slider movie-collection__slider">
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
    <ul class="js-movie slider__wrapper"></ul>
  </div>
  </div>
  `;
  return sectionElem;
};

export const sectioList = (sectionName) => {
  const sectionElem = document.createElement('section');
  sectionElem.dataset.sectionName = sectionName;
  sectionElem.className = 'movie-list js-section';
  sectionElem.innerHTML = `
      <div class="container movie-list__container">
        <h2 class="js-title section-title"></h2>
        <div class="movie-list__filter">
          <button class="js-filter__btn movie-list__filter-btn" type="button">
            Выберите жанр
            <svg>
              <use xlink:href="./img/sprite.svg#filter"></use>
            </svg>
          </button>
          <ul class="js-filter movie-list__filter-list" hidden="hidden">
          </ul>
        </div>
        <div class="movie-list__movies">
          <ul class="js-movie movie-list__list">
          </ul>
          <div class="js-pagination pagination">
          </div>
        </div>
      </div>
  `;
  return sectionElem;
};

export const movieCard = (slide) => {
  const movieCardElem = document.createElement('li');
  movieCardElem.className = 'movie-card';
  if (slide) movieCardElem.classList.add('slider__slide');

  movieCardElem.innerHTML = `
  <a class="movie-card__link" href="#">
    <div class="movie-card__poster-wrap">
      <img class="js-movie__img movie-card__poster" src="" alt="" />
      <span class="js-movie__rating rating"></span>
    </div>
    <div class="movie-card__text-block">
      <h3 class="js-movie__title movie-card__title"></h3>
      <span class="js-movie__date movie-card__year-genre"></span>
    </div>
  </a>
  `;

  return movieCardElem;
};

export const paginationBtn = (value, activeValue = null) => {
  const paginationBtnElem = document.createElement('button');
  paginationBtnElem.type = 'button';
  paginationBtnElem.className = 'pagination__btn';

  if (value === 'prev' || value === 'next') {
    if (value === 'prev') {
      paginationBtnElem.classList.add('js-pagination__prev');
      paginationBtnElem.classList.add('pagination__btn_prev');
    }
      
    else if (value === 'next') {
      paginationBtnElem.classList.add('js-pagination__next');
      paginationBtnElem.classList.add('pagination__btn_next');
    }
      
    paginationBtnElem.innerHTML = `
    <svg class="pagination__btn-icon">
      <use xlink:href="./img/sprite.svg#chevron">
    </svg>
    `;
  } else {
    if(value === activeValue) paginationBtnElem.classList.add('pagination__btn_active');
    if(isFinite(value)) paginationBtnElem.classList.add('js-pagination__btn');
    paginationBtnElem.dataset.paginationBtn = value;
    paginationBtnElem.textContent = value;
  }

  return paginationBtnElem;
};

export const filterItem = () => {
  const filterItemELem = document.createElement('li');
  filterItemELem.className = 'movie-list__filter-item';
  filterItemELem.innerHTML = `
  <button class="js-filter__text movie-list__filter-genre" type="button"></button>
    `;
  return filterItemELem;
};

export const genre = (genreName) => {
  return `<span class="section-title_cyan js-genre">${genreName}</span>`;
};
