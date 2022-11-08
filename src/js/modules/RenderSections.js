import { Slider } from '../libs/Slider.js';

export class RenderSection {
  constructor(section) {
    this.sectionElem = section;
    this.sectionName = this.sectionElem.dataset.sectionName;

    this.APIKey = '?api_key=c6f47a5e59ca4c3c897aaef4440a616c';
    this.beginningPathRequest = 'https://api.themoviedb.org/3';
    this.beginningImgPathRequest = 'https://image.tmdb.org/t/p/w500';
    this.sections = {
      sectionNew: {
        title: 'Новинки',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru&primary_release_date.lte=2022-08-10&primary_release_date.gte=2022-02-10',
      },
      sectionPopular: {
        title: 'Популярное',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru',
      },
      sectionSerial: {
        title: 'Сериалы',
        requestSearchType: '/discover/tv',
        requestSearch: '&language=ru',
      },
      sectionCartoon: {
        title: 'Мультфильмы',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru&with_genres=16&certification_country=US&certification=G',
      },
      sectionListFilm: {
        title: 'По жанрам',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru',
        requestGenre: '/genre/movie/list',
      },
      sectionListSerial: {
        title: 'По жанрам',
        requestSearchType: '/discover/tv',
        requestSearch: '&language=ru',
        requestGenre: '/genre/movie/list',
      },
      sectionListCartoon: {
        title: 'По жанрам',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru&language=ru&with_genres=16&certification_country=US&certification=G',
        requestCertificationGenre: ''
      },
    };

    this.#setStaticContent();
    this.#setAsyncContent();
  }

  #setStaticContent() {
    if (this.sectionName.includes('sectionList')) return;
    const sectionTitleElem = this.sectionElem.querySelector('[data-pattern="title"]');
    sectionTitleElem.textContent = this.sections[this.sectionName].title;
  }

  async #setAsyncContent() {
    const requestSearch = this.sections[this.sectionName].requestSearch;
    const requestSearchType = this.sections[this.sectionName].requestSearchType;
    const request = `${this.beginningPathRequest}${requestSearchType}${this.APIKey}${requestSearch}`;

    const response = await fetch(request);
    const data = await response.json();
    console.log(this.sectionName, data);

    if (this.sectionElem.dataset.sectionType === 'list') {
      const filterElem = this.sectionElem.querySelector('[data-pattern="filter"]');
      this.#addFilterContent(filterElem);
    }

    this.#appendMovieCards(data.results);

    this.#initSlider();
  }

  async #addFilterContent(filterElem) {
    const requestGenre = this.sections[this.sectionName].requestGenre;
    const request = `${this.beginningPathRequest}${requestGenre}${this.APIKey}&language=ru`;

    let genreList;
    if(!this.sections[this.sectionName].requestGenre) {
      genreList = this.sections[this.sectionName].requestCertificationGenre;
    } else {
      const response = await fetch(request);
      genreList = await response.json();
      genreList = genreList.genres;
    }

    for (const genre of genreList) {
      const filterItemElem = this.#createFilterItemElem();
      const filterGenreBtnElem = filterItemElem.querySelector('[data-pattern="filter-text"]');
      filterGenreBtnElem.textContent = genre.name[0].toUpperCase() + genre.name.slice(1);
      filterElem.append(filterItemElem);
    }
  }

  #createFilterItemElem() {
    const filterItemELem = document.createElement('li');
    filterItemELem.className = 'movie-list__filter-item';
    filterItemELem.innerHTML = `
<button class="movie-list__filter-genre" type="button" data-pattern="filter-text"></button>
    `;
    return filterItemELem;
  }

  #initSlider() {
    new Slider(
      '.movie-collection__slider',
      {
        gap: '20',
        slidePerView: 6,
        speed: 500,
        slidePerGroup: 5,
      },
      this.sectionElem
    );
  }

  #appendMovieCards(filmsCollection) {
    const movieCardListElem = this.sectionElem.querySelector('[data-movie="wrap"]');
    const ratingElemCol = [];

    for (const filmObj of filmsCollection) {
      const movieCardElem = this.#createMovieCardElem(this.sectionElem.dataset.sectionType);

      const imgElem = movieCardElem.querySelector('[data-movie="img"]');
      const ratingElem = movieCardElem.querySelector('[data-movie="rating"]');
      const titleElem = movieCardElem.querySelector('[data-movie="title"]');
      const dateElem = movieCardElem.querySelector('[data-movie="date"]');

      imgElem.src = this.beginningImgPathRequest + filmObj.poster_path;
      imgElem.alt = filmObj.title;
      ratingElem.textContent = filmObj.vote_average;
      ratingElemCol.push(ratingElem);
      titleElem.textContent = filmObj.title || filmObj.name;
      dateElem.textContent = filmObj.release_date || filmObj.first_air_date;

      movieCardListElem.append(movieCardElem);
    }

    this.#setColorRatingText(ratingElemCol);
  }

  #createMovieCardElem(sectionType) {
    let movieCardElem;
    if (sectionType === 'slider') {
      movieCardElem = document.createElement('li');
      movieCardElem.className = 'movie-card slider__slide';
    } else if (sectionType === 'list') {
      movieCardElem = document.createElement('div');
      movieCardElem.className = 'movie-card';
    } else throw new Error('Не указан тип шаблона Section при вызове функции');

    movieCardElem.innerHTML = `
    <a class="movie-card__link" href="#">
      <div class="movie-card__poster-wrap"><img class="movie-card__poster" src="" alt="" data-movie="img" />
        <span class="rating" data-movie="rating"></span>
      </div>
      <div class="movie-card__text-block">
        <h3 class="movie-card__title" data-movie="title"></h3>
        <span class="movie-card__year-genre" data-movie="date"></span>
      </div>
    </a>
      `;
    return movieCardElem;
  }

  #setColorRatingText(ratingElemCol) {
    ratingElemCol.forEach((ratingElem) => {
      if (+ratingElem.innerHTML === 0) ratingElem.remove();
      else if (+ratingElem.innerHTML >= 7) ratingElem.style.background = '#007b00';
      else if (+ratingElem.innerHTML < 5) ratingElem.style.background = '#ff0b0b';
    });
  }
}
