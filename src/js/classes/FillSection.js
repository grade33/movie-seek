import { Slider } from '../libs/Slider.js';
import { apiData, cssSelData, htmlData, sectionData } from '../modules/data.js';
import { getRequestData, setRatingColor } from '../modules/helpFunctions.js';

export class FillSection {
  constructor(section) {
    this.sectionEl = section;
    this.mainEl = this.sectionEl.querySelector(cssSelData.main);
    this.cinemaCardWrapEl = this.sectionEl.querySelector(cssSelData.sectionCinemaList);
    this.paginationWrapEl = this.sectionEl.querySelector(cssSelData.pagination);
    this.genreWrapEl = this.sectionEl.querySelector(cssSelData.genre);

    this.sectionName = this.sectionEl.dataset.sectionName;
    this.sectionSettings = sectionData[this.sectionName];
    this.requestData = null;

    this.fillSectionContent();
    if (this.sectionSettings.type === 'catalog') {
      this.paginationWrapEl.addEventListener('click', this.handlerSelectPage.bind(this));
      this.genreWrapEl.addEventListener('click', this.handlerSelectGenre.bind(this));
    }
  }

  async fillSectionContent() {
    const queryType = this.sectionSettings.request.typeDiscover;
    const querySetting = this.sectionSettings.request.querySetting;
    const genreId = this.sectionSettings.request.genreId;

    const page = this.sectionSettings.request.page;
    this.requestData = await getRequestData({ queryType, querySetting, genreId, page });
    // console.log(this.sectionSettings.name,this.requestData);

    this.#clearInner(this.cinemaCardWrapEl);
    this.#appendCinemaCards();

    if (this.sectionSettings.type === 'catalog') {
      this.sectionSettings.request.page = 1;
      this.#clearInner(this.paginationWrapEl);
      this.#appendPaginationBtns();
      this.#appendGenre();
    }

    this.#setSliderSectionTitle();
    this.#initSlider();
  }

  async handlerSelectPage(e) {
    const prevBtn = e.target.closest(cssSelData.paginationBtnPrev);
    const nextBtn = e.target.closest(cssSelData.paginationBtnNext);
    const paginationBtnEl = e.target.closest(cssSelData.paginationBtn);
    if (paginationBtnEl) {
      this.sectionSettings.request.page = paginationBtnEl.dataset.paginationBtn;
    } else if (prevBtn) {
      if (this.sectionSettings.request.page - 1 >= 1) {
        --this.sectionSettings.request.page;
      }
    } else if (nextBtn) {
      const totalPages = this.requestData.total_pages;
      if (this.sectionSettings.request.page + 1 <= totalPages) {
        ++this.sectionSettings.request.page;
      }
    } else return;

    const queryType = this.sectionSettings.request.typeDiscover;
    const querySetting = this.sectionSettings.request.querySetting;
    const genreId = this.sectionSettings.request.genreId;
    const page = this.sectionSettings.request.page;

    this.requestData = await getRequestData({ queryType, querySetting, genreId, page });

    this.#clearInner(this.cinemaCardWrapEl);
    this.#appendCinemaCards();
    this.#clearInner(this.paginationWrapEl);
    this.#appendPaginationBtns();
  }

  async handlerSelectGenre(e) {
    const genreBtnEl = e.target.closest(cssSelData.genreBtn);
    if (!genreBtnEl) return;

    const sectionTitle = this.sectionEl.querySelector(cssSelData.sectionTitle);
    sectionTitle.innerHTML = `${this.sectionSettings.title} в жанре ${htmlData.genre(
      genreBtnEl.textContent
    )}`;

    this.sectionSettings.request.genreId = genreBtnEl.dataset.genreId;
    this.sectionSettings.request.page = 1;

    const queryType = this.sectionSettings.request.typeDiscover;
    const querySetting = this.sectionSettings.request.querySetting;
    const genreId = this.sectionSettings.request.genreId;
    const page = this.sectionSettings.request.page;
    this.requestData = await getRequestData({ queryType, querySetting, genreId, page });

    this.#clearInner(this.cinemaCardWrapEl);
    this.#appendCinemaCards();
    this.#clearInner(this.paginationWrapEl);
    this.#appendPaginationBtns();
  }

  #appendCinemaCards() {
    const cinemaList = this.requestData.results;

    for (const cinema of cinemaList) {
      let cinemaCardEl = htmlData.cinemaCard(this.sectionSettings.type === 'scrollbar');

      const imgEl = cinemaCardEl.querySelector(cssSelData.cinemaImg);
      const ratingEl = cinemaCardEl.querySelector(cssSelData.cinemaRating);
      const titleEl = cinemaCardEl.querySelector(cssSelData.cinemaTitle);
      const dateEl = cinemaCardEl.querySelector(cssSelData.cinemaRelease);

      imgEl.src = apiData.imgBaseURL + apiData.imgFileSize.w500 + cinema.poster_path;
      imgEl.alt = cinema.title;
      ratingEl.textContent = cinema.vote_average;
      setRatingColor(ratingEl);
      titleEl.textContent = cinema.title || cinema.name;
      dateEl.textContent = cinema.release_date || cinema.first_air_date;

      this.cinemaCardWrapEl.append(cinemaCardEl);
    }
  }

  #appendPaginationBtns() {
    this.requestData.total_pages =
      this.requestData.total_pages < 500 ? this.requestData.total_pages : 500;
    const page = this.requestData.page;
    const totalPages = this.requestData.total_pages;

    let startPage = +page - 2;
    let endPage = +page + 2;

    if (startPage < 1) {
      startPage = 1;
      endPage = +page + 2;
    }
    if (endPage > totalPages) {
      startPage = page - 2;
      endPage = totalPages;
    }

    if (startPage !== 1) {
      this.paginationWrapEl.append(htmlData.paginationBtn(1, page));
      this.paginationWrapEl.append(htmlData.paginationBtn('...'));
    }
    for (let i = startPage; i <= endPage; i++) {
      this.paginationWrapEl.append(htmlData.paginationBtn(i, page));
    }
    if (endPage !== totalPages) {
      this.paginationWrapEl.append(htmlData.paginationBtn('...'));
      this.paginationWrapEl.append(htmlData.paginationBtn(totalPages, page));
    }

    const prevBtn = htmlData.paginationBtn('prev');
    const nextBtn = htmlData.paginationBtn('next');
    this.paginationWrapEl.prepend(prevBtn);
    this.paginationWrapEl.append(nextBtn);
  }

  async #appendGenre() {
    const queryType = this.sectionSettings.request.typeGenre;
    const querySetting = '&language=ru';
    const page = this.sectionSettings.request.page;

    const genreData = await getRequestData({ queryType, querySetting, page });

    for (const genre of genreData.genres) {
      const genreItemEl = htmlData.genreItem();
      const genreGenreBtnEl = genreItemEl.querySelector(cssSelData.genreBtn);
      genreGenreBtnEl.dataset.genreId = genre.id;
      genreGenreBtnEl.textContent = genre.name[0].toUpperCase() + genre.name.slice(1);
      this.genreWrapEl.append(genreItemEl);
    }
  }

  #initSlider() {
    new Slider(
      '.slider',
      {
        gap: '20',
        slidePerView: 6,
        speed: 500,
        slidePerGroup: 5,
      },
      this.sectionEl
    );
  }
  #setSliderSectionTitle() {
    const sectionTitleEl = this.sectionEl.querySelector(cssSelData.sectionTitle);
    sectionTitleEl.textContent = this.sectionSettings.title;
  }

  #clearInner(elem) {
    elem.innerHTML = null;
  }
}
