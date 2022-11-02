export function setMainMovieInfoWidth() {
  let textBlock = document.querySelector('.main-movie__info');
  let emptySpace = document.querySelector('.main-movie__empty-space');
  let poster = document.querySelector('.main-movie__poster');
  textBlock.style.width = 370 + emptySpace.offsetWidth + 'px';
  poster.onload = () => {
    console.log('poster onload');
    textBlock.style.width = 370 + emptySpace.offsetWidth + 'px';
  }
}
