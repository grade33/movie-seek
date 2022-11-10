import { RenderSection } from './RenderSections.js';
import { pageList } from './sectionsData.js';
import { sectioSlider, sectioList } from '../libs/htmlPattern.js';

export class RenderPage {
  constructor() {
    this.cssClasses = {
      section: 'js-section',
      nav: 'js-nav',
      main: 'js-main',
      mainTitle: 'js-main__title',
      navLink: 'nav__link',
    };

    this.DOMElems = {
      sectionWrapElem: document.querySelector(`.${this.cssClasses.main}`),
      navElem: document.querySelector(`.${this.cssClasses.nav}`),
      navLinkElem: null,
    };

    this.pageName = null;

    // Function Call
    this.#onClickNavLink();
    this.#clickFirstLink();
  }

  #clickFirstLink() {
    const firstNavLink = document.querySelector(
      `.${this.cssClasses.navLink}[data-nav="pageSerial"]`
    );
    firstNavLink.click();
  }

  #onClickNavLink() {
    this.DOMElems.navElem.addEventListener('click', (e) => {
      const navLink = e.target.closest(`.${this.cssClasses.navLink}`);
      if (!navLink) return;

      this.#setCurrentActiveLink(navLink);
      this.#setPageTitle();
      this.#renderPageSections();
    });
  }

  #setCurrentActiveLink(navLink) {
    this.DOMElems.navLinkElem = navLink;
    this.pageName = this.DOMElems.navLinkElem.dataset.nav;

    this.DOMElems.navElem
      .querySelectorAll(`.${this.cssClasses.navLink}_active`)
      .forEach((link) => link.classList.remove(`${this.cssClasses.navLink}_active`));
    this.DOMElems.navLinkElem.classList.add(`${this.cssClasses.navLink}_active`);
  }

  #setPageTitle() {
    const mainTitleElem = document.querySelector(`.${this.cssClasses.mainTitle}`);
    mainTitleElem.innerHTML = this.DOMElems.navLinkElem.textContent.trim();
  }

  #renderPageSections() {
    Array.from(this.DOMElems.sectionWrapElem.children).forEach((sectionElem) => {
      if (!sectionElem.classList.contains(this.cssClasses.section)) return;
      sectionElem.remove();
    });

    for (const sectionName of pageList[this.pageName]) {
      let sectionElem = null;

      if (sectionName.includes('sectionList')) {
        sectionElem = sectioList(sectionName);
      }
      else {
        sectionElem = sectioSlider(sectionName);
      }

      this.DOMElems.sectionWrapElem.append(sectionElem);

      new RenderSection(sectionElem);
    }
  }
}
