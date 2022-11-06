import { RenderSection } from './RenderSections.js';

export class RenderPage {
  sectionClassic = null;
  sectionGenre = null;

  constructor() {
    this.nav = document.querySelector('.nav');
    this.main = document.querySelector('.main');

    this.activeLink = document.querySelector('.nav__link[data-nav="pageMain"]');
    this.pageName = this.activeLink.dataset.nav;
    this.pages = {
      pageMain: [
        'sectionNew',
        'sectionPopular',
        'sectionWatchedNow',
        'sectionFilm',
        'sectionSerial',
        'sectionCartoon',
      ],
      pageFilm: [
        'sectionGenreFilm',
        'sectionNew',
        'sectionPopular',
        'sectionWatchedNow',
      ],
      pageSerial: [
        'sectionGenreSerial',
        'sectionNew',
        'sectionPopular',
        'sectionWatchedNow',
      ],
      pageCartoon: [
        'sectionGenreCartoon',
        'sectionNew',
        'sectionPopular',
        'sectionWatchedNow',
      ]
    };

    this.saveAndClearSections();
    this.initMethods();
    this.monitoringNavLinkChange();
  }

  saveAndClearSections() {
    const sectionClassic = document.querySelector('section[data-section="classic"]');
    sectionClassic.remove();
    const sectionGenre = document.querySelector('section[data-section="genre"]');
    sectionGenre.remove();

    this.sectionClassic = sectionClassic;
    this.sectionGenre = sectionGenre;
  }

  monitoringNavLinkChange() {
    this.nav.addEventListener('click', (e) => {
      const navLink = e.target.closest('.nav__link');
      if (!navLink || navLink === this.activeLink) return;

      this.setActiveLink(navLink);
      this.initMethods();
    });
  }

  initMethods() {
    this.setClassActiveLink();
    this.setMainTitle();
    this.renderPageSections();
  }

  setActiveLink(navLink) {
    this.activeLink = navLink;
    this.pageName = this.activeLink.dataset.nav;
  }

  setClassActiveLink() {
    this.nav.querySelectorAll('.nav__link_active').forEach(link => link.classList.remove('nav__link_active'));
    this.activeLink.classList.add('nav__link_active');
  }

  setMainTitle() {
    const mainTitle = document.querySelector('.main__title');
    mainTitle.innerHTML = this.activeLink.textContent.trim();
  }

  renderPageSections() {
    this.main.querySelectorAll('[data-section]').forEach(section => {
      section.remove();
    });
    
    const page = this.pages[this.pageName];
    let sectionElem;
    for (const sectionName of page) {
      if(sectionName.includes('Genre')) {
        sectionElem = this.sectionGenre.cloneNode(true);
      } else {
        sectionElem = this.sectionClassic.cloneNode(true);
      }
      sectionElem.dataset.sectionName = sectionName;
      this.main.append(sectionElem);
      new RenderSection(sectionElem);
    }
  }
}