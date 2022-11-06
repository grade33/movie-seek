export class RenderSection {
  constructor(section) {
    this.sectionElem = section;
    this.sectionName = this.sectionElem.dataset.sectionName;
    this.sections = {
      sectionNew: {
        title: 'Новинки',
      },
      sectionPopular: {
        title: 'Популярное',
      },
      sectionWatchedNow: {
        title: 'Сейчас смотрят',
      },
      sectionFilm: {
        title: 'Фильмы',
      },
      sectionSerial: {
        title: 'Сериалы',
      },
      sectionCartoon: {
        title: 'Мультфильмы',
      },
      sectionGenresFilm: {
        title: 'По жанрам',
      },
      sectionGenresSerial: {
        title: 'По жанрам',
      },
      sectionGenresCartoon: {
        title: 'По жанрам',
      },

    };

    this.setTexts();
  }
  setTexts() {
    if(this.sectionName.includes('Genre')) return;
    const mainTitle = this.sectionElem.querySelector('[data-pattern="title"]');
    mainTitle.textContent = this.sections[this.sectionName].title;
  }
}