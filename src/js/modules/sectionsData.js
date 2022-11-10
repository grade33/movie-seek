export const pageList = {
  pageMain: ['sectionNew', 'sectionPopular', 'sectionSerial', 'sectionCartoon'],
  pageFilm: ['sectionListFilm', 'sectionNew', 'sectionPopular'],
  pageSerial: ['sectionListSerial', 'sectionNew', 'sectionPopular'],
};

export const sectionsData = {
  sectionNew: {
    name: 'sectionNew',
    type: 'slider',
    title: 'Новинки',
    request: {
      typeDiscover: '/discover/movie',
      settingDefault: '&language=ru&primary_release_date.lte=2022-08-10&primary_release_date.gte=2022-06-10',
      page: 1,
    },
  },
  sectionPopular: {
    name: 'sectionPopular',
    type: 'slider',
    title: 'Популярное',
    request: {
      typeDiscover: '/discover/movie',
      settingDefault: '&language=ru',
      page: 1,
    },
  },
  sectionSerial: {
    name: 'sectionSerial',
    type: 'slider',
    title: 'Сериалы',
    request: {
      typeDiscover: '/discover/tv',
      settingDefault: '&language=ru',
      page: 1,
    },
  },
  sectionCartoon: {
    name: 'sectionCartoon',
    type: 'slider',
    title: 'Мультфильмы',
    request: {
      typeDiscover: '/discover/movie',
      settingDefault: '&language=ru&with_genres=16&certification_country=US&certification=G',
      page: 1,
    },
  },
  sectionListFilm: {
    name: 'sectionListFilm',
    type: 'list',
    title: 'Лучшие фильмы',
    request: {
      typeDiscover: '/discover/movie',
      typeGenre: '/genre/movie/list',
      settingDefault: '&language=ru',
      SettingGenre: null,
      page: 1,
    },
  },
  sectionListSerial: {
    name: 'sectionListSerial',
    type: 'list',
    title: 'Лучшие сериалы',
    request: {
      typeDiscover: '/discover/tv',
      typeGenre: '/genre/tv/list',
      settingDefault: '&language=ru',
      genre: null,
      page: 1,
    },
  },
};