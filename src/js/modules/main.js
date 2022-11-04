export function setPaddingStantHeader() {
  const content = document.querySelector('.content');
  const header = document.querySelector('.header');
  const aside = document.querySelector('.aside');
  content.style.marginTop = header.offsetHeight + 'px';
  aside.style.top = header.offsetHeight + 'px';
}
