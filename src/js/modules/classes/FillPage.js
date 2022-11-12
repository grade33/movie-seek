import { cssSelData, htmlData, pageData, sectionData } from '../data.js';
import { FillSection } from './FillSection.js';

export class FillPage {
  constructor() {
    this.mainEl = document.querySelector(cssSelData.main);

    document.addEventListener('click', async (e) => {
      const navLink = e.target.closest(cssSelData.navLink);
      if (!navLink) return;

      this.initFunctions(navLink);
    });

    this.clickFirstLink();
  }
  initFunctions(navLink) {
    this.#clearActiveLinks(cssSelData.navLink, 'nav__link_active');
    this.#setActiveLink(navLink, 'nav__link_active');
    this.#setPageTitle(navLink.textContent);
    this.#removeSections();
    this.#appendSections(navLink);
  }

  clickFirstLink() {
    const navLink = document.querySelector(
      `${cssSelData.navLink}[data-page-type="pageSerial"]`
    );
    navLink.click();
  }

  #clearActiveLinks(selector, activeClassName) {
    document.querySelectorAll(selector).forEach((elem) => {
      elem.classList.remove(activeClassName);
    });
  }
  #setActiveLink(elem, activeClassName) {
    elem.classList.add(activeClassName);
  }

  #setPageTitle(titleText) {
    const pageTitleEl = document.querySelector(cssSelData.pageTitle);
    pageTitleEl.textContent = titleText.trim();
  }

  #removeSections() {
    this.mainEl.querySelectorAll(cssSelData.section).forEach((sectionEl) => {
      sectionEl.remove();
    });
  }
  async #appendSections(navLink) {
    const pageType = navLink.dataset.pageType;
    for (const sectionName of pageData[pageType]) {
      let sectionEl;
      if (sectionData[sectionName].type === 'scrollbar') {
        sectionEl = htmlData.sectionScrollbar(sectionName);
      } else if (sectionData[sectionName].type === 'catalog') {
        sectionEl = htmlData.sectionCatalog(sectionName);
      }
      this.mainEl.append(sectionEl);
      new FillSection(sectionEl);
    }
  }
}
