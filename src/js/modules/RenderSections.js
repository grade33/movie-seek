import { Slider } from '../libs/Slider.js';
import { movieCard, paginationBtn, filterItem, genre } from '../libs/htmlPattern.js';
import { sectionsData } from './sectionsData.js';

export class RenderSection {
  constructor(section) {
    // Selectors
    this.cssSel = {
      title: '.js-title',
      pagination: '.js-pagination',
      paginationBtn: '.js-pagination__btn',
      paginationBtnPrev: '.js-pagination__prev',
      paginationBtnNext: '.js-pagination__next',
      filter: '.js-filter',
      filterText: '.js-filter__text',
      movie: '.js-movie',
      movieImg: '.js-movie__img',
      movieRating: '.js-movie__rating',
      movieTitle: '.js-movie__title',
      movieDate: '.js-movie__date',
    };

    // DOM Elems
    this.sectionElem = section;
    this.movieCardWrapElem = this.sectionElem.querySelector(this.cssSel.movie);
    this.filterWrapElem = this.sectionElem.querySelector(this.cssSel.filter);
    this.paginationWrapElem = this.sectionElem.querySelector(this.cssSel.pagination);

    // Settings
    this.sectionData = sectionsData[this.sectionElem.dataset.sectionName];
    this.typeDiscover = this.sectionData.request.typeDiscover;

    // API Paths
    this.APIKey = '?api_key=c6f47a5e59ca4c3c897aaef4440a616c';
    this.beginningPathRequest = 'https://api.themoviedb.org/3';
    this.beginningImgPathRequest = 'https://image.tmdb.org/t/p/w500';

    // Function Call
    this.#renderMovieCardAndPagination(this.typeDiscover).then(() => {
      if (this.sectionData.type === 'list') this.#renderFilter();

      this.#initSlider();
      this.#setSliderSectionTitle();
    });
  }

  async #getRequestData(queryType) {
    const settingDefault = this.sectionData.request.settingDefault;
    const settingPage = `&page=${this.sectionData.request.page}`;
    let settingGenre = this.sectionData.request.genre;
    settingGenre = settingGenre ? `&with_genres=${settingGenre}` : '';

    const request = `${this.beginningPathRequest}${queryType}${this.APIKey}${settingDefault}${settingGenre}${settingPage}`;
    const response = await fetch(request);
    const data = await response.json();

    // console.log(this.sectionData.name, data);
    return data;
  }
  async #renderMovieCardAndPagination(queryType) {
    const data = await this.#getRequestData(queryType);
    this.#renderMovieCard(data.results);

    if (this.sectionData.type === 'list')
      this.#renderPagination(data.page, data.total_pages);
  }

  #renderMovieCard(filmList) {
    this.movieCardWrapElem.innerHTML = null;

    for (const movie of filmList) {
      let movieCardElem;

      movieCardElem = movieCard(this.sectionData.type === 'slider');

      const imgElem = movieCardElem.querySelector(this.cssSel.movieImg);
      const ratingElem = movieCardElem.querySelector(this.cssSel.movieRating);
      const titleElem = movieCardElem.querySelector(this.cssSel.movieTitle);
      const dateElem = movieCardElem.querySelector(this.cssSel.movieDate);

      imgElem.src = this.beginningImgPathRequest + movie.poster_path;
      imgElem.alt = movie.title;
      ratingElem.textContent = movie.vote_average;
      setRatingColor(ratingElem);
      titleElem.textContent = movie.title || movie.name;
      dateElem.textContent = movie.release_date || movie.first_air_date;

      this.movieCardWrapElem.append(movieCardElem);
    }

    function setRatingColor(ratingElem) {
      if (+ratingElem.innerHTML === 0) ratingElem.remove();
      else if (+ratingElem.innerHTML >= 7) ratingElem.style.background = '#007b00';
      else if (+ratingElem.innerHTML < 5) ratingElem.style.background = '#ff0b0b';
    }
  }

  #renderPagination(page, totalPages) {
    this.paginationWrapElem.innerHTML = null;
    this.sectionData.request.page = 1;

    let startPage = +page - 2;
    let endPage = +page + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = +page + 2;
    }
    if (endPage > totalPages) {
      startPage = page - 2;
      endPage = totalPages;
    }

    if (startPage !== 1) {
      this.paginationWrapElem.append(paginationBtn(1, page));
      this.paginationWrapElem.append(paginationBtn('...'));
    }
    for (let i = startPage; i <= endPage; i++) {
      this.paginationWrapElem.append(paginationBtn(i, page));
    }
    if (endPage !== totalPages) {
      this.paginationWrapElem.append(paginationBtn('...'));
      this.paginationWrapElem.append(paginationBtn(totalPages, page));
    }

    const prevBtn = paginationBtn('prev');
    const nextBtn = paginationBtn('next');
    this.paginationWrapElem.prepend(prevBtn);
    this.paginationWrapElem.append(nextBtn);

    this.#setHandlerPagination(totalPages);
  }
  #setHandlerPagination(totalPages) {
    const prevBtn = this.sectionElem.querySelector(this.cssSel.paginationBtnPrev);
    const nextBtn = this.sectionElem.querySelector(this.cssSel.paginationBtnNext);
    prevBtn.addEventListener('click', () => {
      if (this.sectionData.request.page - 1 >= 1) {
        --this.sectionData.request.page;
        getNewPage.call(this);
      }
    });
    nextBtn.addEventListener('click', () => {
      if (this.sectionData.request.page + 1 <= totalPages) {
        ++this.sectionData.request.page;
        getNewPage.call(this);
      }
    });

    this.paginationWrapElem
      .querySelectorAll(this.cssSel.paginationBtn)
      .forEach((paginationBtnElem) => {
        paginationBtnElem.addEventListener('click', () => {
          this.sectionData.request.page = paginationBtnElem.dataset.paginationBtn;
          getNewPage.call(this);
        });
      });

    async function getNewPage() {
      this.#renderMovieCardAndPagination(this.typeDiscover);
    }
  }

  async #renderFilter() {
    const queryType = this.sectionData.request.typeGenre;
    const genreData = await this.#getRequestData(queryType);
    for (const genre of genreData.genres) {
      const filterItemElem = filterItem();
      const filterGenreBtnElem = filterItemElem.querySelector(this.cssSel.filterText);
      filterGenreBtnElem.dataset.genreId = genre.id;
      filterGenreBtnElem.textContent = genre.name[0].toUpperCase() + genre.name.slice(1);
      this.filterWrapElem.append(filterItemElem);
    }

    this.#setHandlerFilter();
  }
  #setHandlerFilter() {
    this.filterWrapElem
      .querySelectorAll(this.cssSel.filterText)
      .forEach((filterGenreBtnElem) => {
        filterGenreBtnElem.addEventListener('click', (e) => {
          const sectionTitle = this.sectionElem.querySelector(this.cssSel.title);
          sectionTitle.innerHTML = `${this.sectionData.title} в жанре ${genre(
            e.currentTarget.textContent
          )}`;

          this.sectionData.request.genre = e.currentTarget.dataset.genreId;
          this.#renderMovieCardAndPagination(this.typeDiscover);
        });
      });
  }

  #initSlider() {
    new Slider(
      '.slider',
      {
        gap: '20',
        slidePerView: 6,
        speed: 500,
        slidePerGroup: 5,
      },
      this.sectionElem
    );
  }
  #setSliderSectionTitle() {
    const sectionTitleElem = this.sectionElem.querySelector(this.cssSel.title);
    sectionTitleElem.textContent = this.sectionData.title;
  }
}
