import { apiData } from '../modules/data.js';
import { getRequestData, setRatingColor } from '../modules/helpFunctions.js';

export class FillCinemaContent {
  constructor(selector, movieId, cinemaType) {
    this.cinema = document.querySelector(selector);
    this.elem = {
      poster: this.cinema.querySelector(`${selector}__poster`),
      title: this.cinema.querySelector(`${selector}__title`),
      releaseYearTitle: this.cinema.querySelector(`${selector}__release`),
      titleOriginal: this.cinema.querySelector(`${selector}__title-original`),
      certificationTitle: this.cinema.querySelector(`${selector}__certification-title`),
      overview: this.cinema.querySelector(`${selector}__overview`),
      releaseYear: this.cinema.querySelector(`${selector}__release-year`),
      country: this.cinema.querySelector(`${selector}__country`),
      genre: this.cinema.querySelector(`${selector}__genre`),
      slogan: this.cinema.querySelector(`${selector}__slogan`),
      directing: this.cinema.querySelector(`${selector}__directing`),
      writing: this.cinema.querySelector(`${selector}__writing`),
      production: this.cinema.querySelector(`${selector}__production`),
      camera: this.cinema.querySelector(`${selector}__camera`),
      sound: this.cinema.querySelector(`${selector}__sound`),
      art: this.cinema.querySelector(`${selector}__art`),
      editing: this.cinema.querySelector(`${selector}__editing`),
      budget: this.cinema.querySelector(`${selector}__budget`),
      revenue: this.cinema.querySelector(`${selector}__revenue`),
      premiere: this.cinema.querySelector(`${selector}__premiere`),
      certification: this.cinema.querySelector(`${selector}__certification`),
      time: this.cinema.querySelector(`${selector}__time`),
    };

    this.cinemaType = cinemaType;
    this.movieId = movieId;
    this.mainQueryType = `/${this.cinemaType}/${this.movieId}`;
    this.creditsQueryType = `${this.mainQueryType}/credits`;
    this.certificationQueryType = `${this.mainQueryType}/release_dates`;
    this.querySetting = '&language=ru';

    this.certification = null;
    this.release = null;

    this.clearAllTextContent();
    this.fillMovieContent();
  }

  clearAllTextContent() {
    for (const key in this.elem) {
      if (Object.hasOwnProperty.call(this.elem, key)) {
        const elem = this.elem[key];
        elem.textContent = '';
      }
    }
  }

  async getDatas() {
    this.mainData = await getRequestData({
      queryType: this.mainQueryType,
      querySetting: this.querySetting,
    });
    this.creditsData = await getRequestData({
      queryType: this.creditsQueryType,
      querySetting: this.querySetting,
    });
    this.ratingMPAAData = await getRequestData({
      queryType: this.certificationQueryType,
      querySetting: this.querySetting,
    });
  }

  async fillMovieContent() {
    await this.getDatas();

    for (const result of this.ratingMPAAData.results) {
      if (result.iso_3166_1 === 'US') {
        this.certification = result.release_dates[0].certification;
      }
    }
    this.release = new Date(this.mainData.release_date);

    this.#setHeading();
    this.#setAboutCinema();
  }

  #setHeading() {
    const imgPathBase = apiData.imgBaseURL + apiData.imgFileSize.original;

    this.elem.poster.src = imgPathBase + this.mainData.poster_path;
    this.elem.poster.alt = this.mainData.title;

    this.elem.title.textContent = this.mainData.title;
    this.elem.releaseYearTitle.textContent = `(${this.release.getFullYear()})`;

    this.elem.titleOriginal.textContent = this.mainData.original_title;
    this.elem.certificationTitle.textContent = this.certification;

    this.elem.overview.textContent = this.mainData.overview;

    this.elem.releaseYear.textContent = this.release.getFullYear();
  }

  #setCrew() {
    for (const person of this.creditsData.crew) {
      switch (person.known_for_department.toLowerCase()) {
        case 'directing':
          this.elem.directing.textContent += person.name + '  ';
          break;
        case 'writing':
          this.elem.writing.textContent += person.name + '  ';
          break;
        case 'production':
          this.elem.production.textContent += person.name + '  ';
          break;
        case 'camera':
          this.elem.camera.textContent += person.name + '  ';
          break;
        case 'sound':
          this.elem.sound.textContent += person.name + '  ';
          break;
        case 'art':
          this.elem.art.textContent += person.name + '  ';
          break;
        case 'editing':
          this.elem.editing.textContent += person.name + '  ';
          break;
        default:
          break;
      }
    }
    this.elem.directing.textContent = this.elem.directing.textContent.trim().split('  ').join(', ');
    this.elem.writing.textContent = this.elem.writing.textContent.trim().split('  ').join(', ');
    this.elem.production.textContent = this.elem.production.textContent
      .trim()
      .split('  ')
      .join(', ');
    this.elem.camera.textContent = this.elem.camera.textContent.trim().split('  ').join(', ');
    this.elem.sound.textContent = this.elem.sound.textContent.trim().split('  ').join(', ');
    this.elem.art.textContent = this.elem.art.textContent.trim().split('  ').join(', ');
    this.elem.editing.textContent = this.elem.editing.textContent.trim().split('  ').join(', ');
  }

  #setAboutCinema() {
    for (const country of this.mainData.production_countries) {
      this.elem.country.textContent += country.iso_3166_1 + '  ';
    }
    this.elem.country.textContent.trim().split('  ').join(', ');

    for (const genre of this.mainData.genres) {
      this.elem.genre.textContent += genre.name[0].toUpperCase() + genre.name.slice(1) + '  ';
    }
    this.elem.genre.textContent.trim().split('  ').join(', ');

    this.elem.slogan.textContent = this.mainData.tagline;

    this.#setCrew();

    this.elem.budget.textContent =
      '$' + new Intl.NumberFormat('ru-RU').format(this.mainData.budget);
    this.elem.revenue.textContent =
      '$' + new Intl.NumberFormat('ru-RU').format(this.mainData.revenue);

    this.elem.certification.textContent = this.certification;

    this.elem.premiere.textContent = new Intl.DateTimeFormat().format(this.release);

    let hours = Math.trunc(this.mainData.runtime / 60);
    hours = hours < 10 ? '0' + hours : hours;
    let minutes = this.mainData.runtime % 60;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    this.elem.time.textContent = `${this.mainData.runtime}мин. / ${hours}:${minutes}`;
  }
}
