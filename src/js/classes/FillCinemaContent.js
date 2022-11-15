import { apiData, cssSelData, htmlData } from '../modules/data.js';
import { getRequestData, setRatingColor } from '../modules/helpFunctions.js';

export class FillCinemaContent {
  constructor(movieId, cinemaType) {
    this.сinemaPopup = htmlData.cinemaPopup();
    document.querySelector('#app').append(this.сinemaPopup);

    this.cinemaEl = this.сinemaPopup.querySelector(cssSelData.moviePopup);
    this.cinemaLeftEl = this.cinemaEl.querySelector(`${cssSelData.moviePopup}__left`);

    this.elem = {
      poster: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__poster`),
      voteAverage: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__vote-average`),
      voteCount: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__vote-count`),
      actorList: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__actors-list`),
      title: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__title`),
      releaseTitle: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__release`),
      titleOriginal: this.cinemaEl.querySelector(
        `${cssSelData.moviePopup}__title-original`
      ),
      contentRatingTitle: this.cinemaEl.querySelector(
        `${cssSelData.moviePopup}__certification-title`
      ),
      overview: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__overview`),
      releaseYear: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__release-year`),
      country: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__country`),
      genre: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__genre`),
      slogan: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__slogan`),
      directing: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__directing`),
      writing: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__writing`),
      production: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__production`),
      camera: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__camera`),
      sound: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__sound`),
      art: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__art`),
      editing: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__editing`),
      budget: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__budget`),
      revenue: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__revenue`),
      premiere: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__premiere`),
      certification: this.cinemaEl.querySelector(
        `${cssSelData.moviePopup}__certification`
      ),
      time: this.cinemaEl.querySelector(`${cssSelData.moviePopup}__time`),
    };

    this.data = {};

    this.cinemaType = cinemaType;

    this.mainQuery = `/${cinemaType}/${movieId}`;
    this.creditsQuery = `${this.mainQuery}/credits`;
    this.videoQuery = `${this.mainQuery}/videos`;
    if (cinemaType === 'movie') {
      this.contentRatingQuery = `${this.mainQuery}/release_dates`;
    } else if (cinemaType === 'tv') {
      this.contentRatingQuery = `${this.mainQuery}/content_ratings`;
    }
    this.querySetting = '&language=ru';

    this.contentRating = null;
    this.releaseDate = null;

    this.clearElemsInner();
    this.setContent();
  }

  clearElemsInner() {
    for (const key in this.elem) {
      if (Object.hasOwnProperty.call(this.elem, key)) {
        const elem = this.elem[key];
        elem.textContent = '';
      }
    }
  }

  async setContent() {
    await this.getDatas();

    for (const countryRelease of this.data.contentRating.results) {
      if (countryRelease.iso_3166_1 === 'US') {
        if (this.cinemaType == 'movie') {
          for (const release of countryRelease.release_dates) {
            if (release.certification) this.contentRating = release.certification;
          }
        } else if (this.cinemaType == 'tv') {
          this.contentRating = countryRelease.rating;
        }
      }
    }

    if (this.cinemaType === 'movie') {
      this.releaseDate = new Date(this.data.main.release_date);
    } else if (this.cinemaType === 'tv') {
      this.releaseDate = [];
      this.releaseDate.push(new Date(this.data.main.first_air_date));
      this.releaseDate.push(new Date(this.data.main.last_air_date));
    }

    this.#setMainContent();

    this.#setAboutCinema();
    this.#processEmptyTextContent();
  }

  async getDatas() {
    this.data.main = await getRequestData({
      queryType: this.mainQuery,
      querySetting: this.querySetting,
    });
    this.data.credits = await getRequestData({
      queryType: this.creditsQuery,
    });
    this.data.video = await getRequestData({
      queryType: this.videoQuery,
    });
    this.data.contentRating = await getRequestData({
      queryType: this.contentRatingQuery,
    });

    console.log(this.data.main);
    console.log(this.data.credits);
    console.log(this.data.contentRating);
    console.log(this.data.video);
  }

  #setMainContent() {
    // Left Block
    const imgPathBase = apiData.imgBaseURL + apiData.imgFileSize.original;
    this.elem.poster.src = imgPathBase + this.data.main.poster_path;
    this.elem.poster.alt = this.data.main.title || this.data.main.name;

    this.#addTrailer();

    // Center Block
    this.elem.title.textContent = this.data.main.title || this.data.main.name;

    if (this.cinemaType === 'movie') {
      this.elem.releaseTitle.textContent = `(${this.releaseDate.getFullYear()})`;
    } else if (this.cinemaType === 'tv') {
      if (this.data.main.in_production) {
        this.elem.releaseTitle.textContent = `(${this.releaseDate[0].getFullYear()} - ...)`;
      } else {
        this.elem.releaseTitle.textContent = `(${this.releaseDate[0].getFullYear()} - ${this.releaseDate[1].getFullYear()})`;
      }
    }

    this.elem.titleOriginal.textContent =
      this.data.main.original_title || this.data.main.original_name;
    if (this.contentRating) {
      this.elem.contentRatingTitle.textContent = this.contentRating;
    } else {
      this.elem.contentRatingTitle.remove();
    }

    this.elem.overview.textContent = this.data.main.overview;

    // Right Block
    this.elem.voteAverage.textContent = this.data.main.vote_average;
    setRatingColor(this.elem.voteAverage, true);
    this.elem.voteCount.textContent = new Intl.NumberFormat('ru-RU').format(
      this.data.main.vote_count
    );

    for (const person of this.data.credits.cast) {
      this.elem.actorList.append(htmlData.actorItem(person.name));
    }
  }
  #addTrailer() {
    let videoKey;
    let videoName;
    for (let i = 0; i < this.data.video.results.length; i++) {
      const videoSettings = this.data.video.results[i];
      const videoSite = videoSettings.site.toLowerCase();
      const videoType = videoSettings.type.toLowerCase();
      if (!(videoSite === 'youtube' && videoType === 'trailer')) continue;

      videoKey = videoSettings.key;
      videoName = videoSettings.name;
      break;
    }
    if (!(videoKey || videoName)) return;

    const trailerBtn = htmlData.trailerBtn(videoKey, videoName);
    this.cinemaLeftEl.append(trailerBtn);

    trailerBtn.addEventListener('click', () => {
      const trailerPopup = htmlData.trailerPopup(videoKey);
      document.querySelector('#app').append(trailerPopup);
    });
  }

  #setAboutCinema() {
    if (this.cinemaType == 'movie') {
      this.elem.releaseYear.textContent = this.releaseDate.getFullYear();
    } else if (this.cinemaType == 'tv') {
      const seasonCount = this.data.main.number_of_seasons;
      let seasonText;
      if (seasonCount === 1) seasonText = `(${seasonCount} сезон)`;
      else if (seasonCount > 1 && seasonCount < 5) seasonText = `(${seasonCount} сезона)`;
      else seasonText = `(${seasonCount} сезонов)`;
      this.elem.releaseYear.textContent =
        this.releaseDate[0].getFullYear() + ' ' + seasonText;
    }

    const countryArr = [];
    for (const country of this.data.main.production_countries) {
      countryArr.push(country.iso_3166_1);
    }
    this.#separateTextCommans(countryArr, this.elem.country);

    const genreArr = [];
    for (const genre of this.data.main.genres) {
      genreArr.push(genre.name[0].toUpperCase() + genre.name.slice(1));
    }
    this.#separateTextCommans(genreArr, this.elem.genre);

    const tagline = this.data.main.tagline;
    if(tagline) {
      this.elem.slogan.textContent = tagline.includes('«') ? tagline : '«' + tagline + '»';
    }

    this.#setCrew();

    if (this.cinemaType === 'movie') {
      const formatedBudget = new Intl.NumberFormat('ru-RU').format(this.data.main.budget);
      this.elem.budget.textContent = formatedBudget == 0 ? null : '$' + formatedBudget;
      const formatedRevenue = new Intl.NumberFormat('ru-RU').format(
        this.data.main.revenue
      );
      this.elem.revenue.textContent = formatedRevenue == 0 ? null : '$' + formatedRevenue;
    } else if (this.cinemaType === 'tv') {
      this.elem.budget.closest(cssSelData.moviePopupAboutItem).remove();
      this.elem.revenue.closest(cssSelData.moviePopupAboutItem).remove();
    }

    this.elem.certification.textContent = this.contentRating;

    this.elem.premiere.textContent = new Intl.DateTimeFormat().format(
      this.releaseDate[0] || this.releaseDate
    );

    // let hours = Math.trunc(this.data.main.runtime / 60);
    // hours = hours < 10 ? '0' + hours : hours;
    // let minutes = this.data.main.runtime % 60;
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    // this.elem.time.textContent = `${this.data.main.runtime}мин. / ${hours}:${minutes}`;
  }
  #setCrew() {
    const departaments = {
      directing: [],
      writing: [],
      production: [],
      camera: [],
      sound: [],
      art: [],
      editing: [],
    };
    for (const person of this.data.credits.crew) {
      const personDepartament = person.known_for_department.toLowerCase();
      if (departaments[personDepartament]) {
        departaments[personDepartament].push(person.name);
      }
    }
    for (const key in departaments) {
      const departamentArr = departaments[key];
      this.#separateTextCommans(departamentArr, this.elem[key]);
    }
  }

  #processEmptyTextContent() {
    for (const key in this.elem) {
      if (Object.hasOwnProperty.call(this.elem, key)) {
        const elem = this.elem[key];
        if (!elem.textContent) elem.textContent = '—';
      }
    }
  }

  #separateTextCommans(arr, elem) {
    elem.textContent = arr.join(', ');
  }
}
