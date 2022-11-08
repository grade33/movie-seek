import { RenderSection } from './RenderSections.js';

export class RenderPage {
  constructor() {
    // DOM Elements
    this.sectionWrapElem = document.querySelector('.main');
    this.navElem = document.querySelector('.nav');
    this.navLinkElem = null;

    // Selectors
    this.ClassNavLink = 'nav__link';
    this.SelectorNavLink = '.nav__link';
    this.ClassNavLinkActive = 'nav__link_active';
    this.SelectorNavLinkActive = '.nav__link_active';
    this.SelectorMainTitle = '.main__title';
    this.dataSection = 'data-section';
    this.ClassMovieCol = 'movie-collection';
    this.ClassMovieList = 'movie-list';

    // Settings
    this.pageName = null;
    this.pages = {
      pageMain: ['sectionNew', 'sectionPopular', 'sectionSerial', 'sectionCartoon'],
      pageFilm: ['sectionListFilm', 'sectionNew', 'sectionPopular'],
      pageSerial: ['sectionListSerial', 'sectionNew', 'sectionPopular'],
      pageCartoon: ['sectionListCartoon', 'sectionNew', 'sectionPopular'],
    };

    // Function Call
    const navFirstLinkElem = document.querySelector('.nav__link[data-nav="pageMain"]');
    this.#setCurrentActiveLink(navFirstLinkElem);
    this.#setPageTitle();
    this.#appendPageSections();
    
    this.#monitoringNavLinkChange();
  }

  #monitoringNavLinkChange() {
    this.navElem.addEventListener('click', (e) => {
      const navLink = e.target.closest(this.SelectorNavLink);
      if (!navLink || navLink === this.navLinkElem) return;

      this.#setCurrentActiveLink(navLink);
      this.#setPageTitle();
      this.#appendPageSections();
    });
  }

  #setCurrentActiveLink(navLink) {
    this.navLinkElem = navLink;
    this.pageName = this.navLinkElem.dataset.nav;

    this.navElem.querySelectorAll(this.SelectorNavLinkActive).forEach((link) => link.classList.remove(this.ClassNavLinkActive));
    this.navLinkElem.classList.add(this.ClassNavLinkActive);
  }

  #setPageTitle() {
    const mainTitleElem = document.querySelector(this.SelectorMainTitle);
    mainTitleElem.innerHTML = this.navLinkElem.textContent.trim();
  }

  #appendPageSections() {
    Array.from(this.sectionWrapElem.children).forEach((sectionElem) => {
      if (!sectionElem.hasAttribute(this.dataSection)) return;
      sectionElem.remove();
    });

    const pageObj = this.pages[this.pageName];
    for (const sectionName of pageObj) {
      let sectionElem = null;

      if (sectionName.includes('sectionList')) {
        sectionElem = this.#createSectionElemPattern('list');
      } else {
        sectionElem = this.#createSectionElemPattern('slider');
      }

      sectionElem.dataset.section = '';
      sectionElem.dataset.sectionName = sectionName;
      this.sectionWrapElem.append(sectionElem);

      new RenderSection(sectionElem);
    }
  }

  #createSectionElemPattern(type) {
    const sectionElem = document.createElement('section');

    if (type === 'slider') {
      sectionElem.className = this.ClassMovieCol;
      sectionElem.dataset.sectionType = 'slider';
      sectionElem.innerHTML = `
<div class="container movie-collection__container">
<h2 class="section-title" data-pattern="title"></h2>
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
  <ul class="slider__wrapper" data-movie="wrap"></ul>
</div>
</div>
      `;
    } else if (type === 'list') {
      sectionElem.className = this.ClassMovieCol;
      sectionElem.dataset.sectionType = 'list';
      sectionElem.innerHTML = `
  <div class="container movie-list__container">
    <h2 class="section-title">Лучшие фильмы в жанре: <span>Вестерн</span></h2>
    <div class="movie-list__filter" [data-pattern="filter-text"]>
      <button class="movie-list__filter-btn" type="button" data-pattern="filter-btn">
        Выберите жанр
        <svg>
          <use xlink:href="./img/sprite.svg#filter"></use>
        </svg>
      </button>
      <ul class="movie-list__filter-list" hidden="hidden" data-pattern="filter">
      </ul>
    </div>
    <div class="movie-list__movies">
      <ul class="movie-list__list" data-movie="wrap"></ul>
      <div class="movie-list__pagination">
        <button class="movie-list__pagination-btn" type="button">1</button>
        <button class="movie-list__pagination-btn" type="button">2</button>
        <button class="movie-list__pagination-btn" type="button">3</button>
        <button class="movie-list__pagination-btn" type="button">...</button>
        <button class="movie-list__pagination-btn" type="button">17</button>
      </div>
    </div>
  </div>
      `;
    } else throw new Error('Не указан тип шаблона Section при вызове функции');

    return sectionElem;
  }
}
