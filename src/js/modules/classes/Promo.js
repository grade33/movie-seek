import { apiData } from '../data/apiData.js';
import { setRatingColor } from '../helpFunctions.js';

export class Promo {
  constructor(selector) {
    this.promo = document.querySelector(selector);
    this.title = this.promo.querySelector(`${selector}__title`);
    this.desc = this.promo.querySelector(`${selector}__overview`);
    this.staring = this.promo.querySelector(`${selector}__staring`);
    this.director = this.promo.querySelector(`${selector}__director`);
    this.poster = this.promo.querySelector(`${selector}__poster`);
    this.rating = this.promo.querySelector(`${selector}__rating`);

    this.movieId = 94997;
    this.mainQueryType = `/tv/${this.movieId}`;
    this.creditsQueryType = `${this.mainQueryType}/credits`;

    this.#setContent();
  }

  async #getRequestData(queryType, settings = '') {
    const request = `${apiData.baseURL}${queryType}${apiData.APIKey}&language=ru${settings}`;
    const response = await fetch(request);
    const data = await response.json();

    console.log(data.title || data.name, data);
    return data;
  }

  async #setContent() {
    const mainData = await this.#getRequestData(this.mainQueryType);
    const creditsData = await this.#getRequestData(this.creditsQueryType);
    this.title.textContent = mainData.title || mainData.name;
    this.desc.textContent = mainData.overview;
    for (const person of creditsData.cast) {
      this.staring.textContent += `${person.name}, `;
    }
    for (const person of creditsData.crew) {
      if (person.known_for_department === 'Directing') {
        this.director.textContent += `${person.name}, `;
      }
    }
    this.poster.src =
      apiData.imgBaseURL + apiData.imgFileSize.original + mainData.backdrop_path;
    this.poster.alt = mainData.title || mainData.name;
    this.rating.textContent = mainData.vote_average;
    setRatingColor(this.rating);
  }
}
