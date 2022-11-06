const standartSections = {
  newest: {
    title: 'Новинки',
  },
  popular: {
    title: 'Популярное',
  },
  watchedNow: {
    title: 'Сейчас смотрят',
  },
};

export let sectionsNames = {
  main: {
    standartSections,
    film: {
      title: 'Фильмы',
    },
    serals: {
      title: 'Сериалы',
    },
    cartoons: {
      title: 'Сейчас смотрят',
    },
  }
};


export let mainBanner = `<section class="main-movie" id="main-banner">
  <div class="container main-movie__container"> 
    <div class="main-movie__content"><a class="main-movie__link" href="#"> </a>
      <div class="main-movie__info">
        <h3 class="main-movie__title"> <a href="#">Дом дракона</a></h3>
        <p class="main-movie__desc">Таргариены ведут друг с другом ожесточенную борьбу за Железный трон. Самый долгожданный сериал года</p>
        <ul class="main-movie__structure">
          <li class="main-movie__structure-item"><span class="main-movie__structure-title">В главных ролях:&nbsp;</span><span class="main-movie__structure-text">Юрий Колокольников, Семён Трескунов, Ксения Раппопорт</span></li>
          <li class="main-movie__structure-item"><span class="main-movie__structure-title">Режиссер:&nbsp;</span><span class="main-movie__structure-text">Александр Незлобин</span></li>
        </ul>
      </div>
      <div class="main-movie__poster-wrap"><img class="main-movie__poster" src="@img/movie-preview/preview-big-1.jpg" alt="Постер к главному фильму"/></div>
    </div>
  </div>
</section>`;

export let section = `<section class="movie-collection">
<div class="container movie-collection__container">
  <h2 class="movie-collection__section-title">Новинки</h2>
  <div class="slider movie-collection__slider">
    <button class="slider__btn slider__btn_prev" type="button">
      <svg>
        <use xlink:href="@img/sprite.svg#chevron"></use>
      </svg>
    </button>
    <button class="slider__btn slider__btn_next" type="button">
      <svg>
        <use xlink:href="@img/sprite.svg#chevron"></use>
      </svg>
    </button>
    <ul class="slider__wrapper">
      ${sliderSlide}
    </ul>
  </div>
</div>
</section>`;

export let sliderSlide = ` <li class="slider__slide">
<button class="movie-collection__link" type="button">
  <div class="movie-collection__poster-wrap">
    <img class="movie-collection__poster" src="@img/movie-preview/preview-1.jpg" alt="Постер к фильму" />
    <span class="rating">7.1</span>
  </div>
  <div class="movie-collection__text-block">
    <h3 class="movie-collection__title">Название какого-то фильма</h3>
    <span class="movie-collection__year-genre">2022 Триллер</span>
  </div>
</button>
</li>`;
