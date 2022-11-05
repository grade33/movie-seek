export function setPaddingStantHeader() {
  const content = document.querySelector('.content');
  const header = document.querySelector('.header');
  const aside = document.querySelector('.aside');
  content.style.marginTop = header.offsetHeight + 'px';
  aside.style.top = header.offsetHeight + 'px';
}

export function setColorRatingText() {
  document.querySelectorAll('.rating').forEach(rate => {
    if(+rate.innerHTML > 7) rate.style.background = '#007b00';
    else if(+rate.innerHTML < 5) rate.style.background = '#ff0b0b';
  });
}
