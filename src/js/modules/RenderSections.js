import { Slider } from '../libs/Slider.js';

export class RenderSection {
  constructor(section) {
    this.sectionElem = section;
    this.sectionName = this.sectionElem.dataset.sectionName;

    this.APIKey = '?api_key=c6f47a5e59ca4c3c897aaef4440a616c';
    this.request = 'https://api.themoviedb.org/3';

    this.sections = {
      sectionNew: {
        title: 'Новинки',
        requestSearchType: '/discover/movie',
        requestSearch:
          '&language=ru&with_release_type=1&sort_by=release_date.desc&vote_count.gte=200&primary_release_date.gte=2022-01-01',
      },
      sectionPopular: {
        title: 'Популярное',
        requestSearchType: '/discover/movie',
        requestSearch:
          '&language=ru&with_release_type=1&sort_by=popularity.desc&primary_release_date.gte=2022-01-01',
      },
      sectionWatchedNow: {
        title: 'Сейчас смотрят',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru&with_release_type=1&sort_by=vote_count.desc&primary_release_date.gte=2022-01-01',
      },
      sectionSerial: {
        title: 'Сериалы',
        requestSearchType: '/discover/tv',
        requestSearch: '&language=ru&with_release_type=1&air_date.gte=2022-01-01',
      },
      sectionCartoon: {
        title: 'Мультфильмы',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru&with_genres=16&sort_by=vote_count.desc&primary_release_date.gte=2022-01-01',
      },
      sectionGenresFilm: {
        title: 'По жанрам',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru&with_release_type=1&primary_release_date.gte=2022-01-01',
      },
      sectionGenresSerial: {
        title: 'По жанрам',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru&with_release_type=1&primary_release_date.gte=2022-01-01',
      },
      sectionGenresCartoon: {
        title: 'По жанрам',
        requestSearchType: '/discover/movie',
        requestSearch: '&language=ru&with_release_type=1&primary_release_date.gte=2022-01-01',
      },
    };

    this.setStaticContent();
    this.setAsyncContent();
  }

  setStaticContent() {
    if (this.sectionName.includes('Genre')) return;
    const mainTitle = this.sectionElem.querySelector('[data-pattern="title"]');
    mainTitle.textContent = this.sections[this.sectionName].title;
  }

  async setAsyncContent() {
    const searchType = this.sections[this.sectionName].requestSearchType;
    const search = this.sections[this.sectionName].requestSearch;
    const request = `${this.request}${searchType}${this.APIKey}${search}`;

    const response = await fetch(request);
    const data = await response.json();
    // console.log(data);

    this.appendFilmSlides(data.results);

    this.initSlider();
  }

  appendFilmSlides(filmsCollection) {
    const sliderWrapper = this.sectionElem.querySelector('.slider__wrapper');

    for (const filmObj of filmsCollection) {
      const li = this.createFilmSlide();

      const imgElem = li.querySelector('[data-film="img"]');
      const ratingElem = li.querySelector('[data-film="rating"]');
      const titleElem = li.querySelector('[data-film="title"]');
      const dateElem = li.querySelector('[data-film="date"]');

      const requestImg = 'https://image.tmdb.org/t/p/w500';

      imgElem.src = requestImg + filmObj.poster_path;
      imgElem.alt = filmObj.original_title;
      ratingElem.textContent = filmObj.vote_average;
      titleElem.textContent = filmObj.title || filmObj.name;
      dateElem.textContent = filmObj.release_date || filmObj.first_air_date;

      sliderWrapper.append(li);
    }
  }

  createFilmSlide() {
    let li = document.createElement('li');
    li.className = 'slider__slide movie-card';
    li.innerHTML = `
    <a class="movie-card__link" href="#">
      <div class="movie-card__poster-wrap"><img class="movie-card__poster" src="" alt="" data-film="img" />
        <span class="rating" data-film="rating"></span>
      </div>
      <div class="movie-card__text-block">
        <h3 class="movie-card__title" data-film="title"></h3>
        <span class="movie-card__year-genre" data-film="date"></span>
      </div>
    </a>
      `;
    return li;
  }

  initSlider() {
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
}
