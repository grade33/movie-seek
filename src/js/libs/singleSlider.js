export class SingleSlider {
  scrolledPosition = 0;

  constructor(slider, {
    gap = 0,
    slidePerView = 1,
    slidePerGroup = 1,
    speed = 300,
  }) {
    // Selector
    this.mainSelector = '.slider';

    // DOM Elements
    this.slider = slider;
    this.wrapper = this.slider.querySelector(`${this.mainSelector}__wrapper`);
    this.slides = this.slider.querySelectorAll(`${this.mainSelector}__slide`);
    this.btnPrev = this.slider.querySelector(`${this.mainSelector}__btn_prev`);
    this.btnNext = this.slider.querySelector(`${this.mainSelector}__btn_next`);

    // Settings
    this.slidePerView = slidePerView;
    this.slidePerGroup = slidePerGroup;
    this.gap = gap;
    this.speed = speed;
    this.activeSlide = 0;

    // Functions Call
    this.setSlidesWidth();
    this.setGap();
    this.setSlidesSpeed();
    this.setActiveSlide();    
    this.btnPrev.addEventListener('click', this.prevSlide.bind(this));
    this.btnNext.addEventListener('click', this.nextSlide.bind(this));
  }

  setSlidesWidth() {
    this.slides.forEach(slide => {
      slide.style.width = `calc(100 / ${this.slidePerView} * 1% - ((${this.gap} - ${this.gap} / ${this.slidePerView}) * 1px))`;
    });
  }

  setGap() {
    this.wrapper.style.gap = this.gap + 'px';
  }

  prevSlide() {
    this.scrolledPosition -= this.getMovePoint();
    this.scrolledPosition = this.scrolledPosition < 0 ? 0 : this.scrolledPosition;
    this.wrapper.style.transform = `translateX(-${this.scrolledPosition}px)`;
    this.setActiveSlide('prev');
  }

  nextSlide() {
    const maxScrolledPosition = this.wrapper.scrollWidth - this.wrapper.offsetWidth;
    this.scrolledPosition += this.getMovePoint();
    this.scrolledPosition = this.scrolledPosition > maxScrolledPosition ? maxScrolledPosition : this.scrolledPosition;
    this.wrapper.style.transform = `translateX(-${this.scrolledPosition}px)`;
    this.setActiveSlide('next');
  }

  getMovePoint() {
    let movePoint = 0;
    for (let i = 0; i < this.slidePerGroup; i++) {
      const slide = this.slides[0];
      movePoint += +slide.offsetWidth + +this.gap;
    }
    return movePoint;
  }

  setSlidesSpeed() {
    this.wrapper.style.transition = `transform ${this.speed}ms ease-in-out`;
  }

  setActiveSlide(prevOrNext) {
    if (prevOrNext === 'prev') {
      this.activeSlide -= this.slidePerGroup;
      this.activeSlide = this.activeSlide < 0 ? 0 : this.activeSlide;
    }
    else if (prevOrNext === 'next') {
      if(this.slides[this.slides.length - this.slidePerView].classList.contains('slider__slide_active')) return false;
      this.activeSlide += this.slidePerGroup; 
      this.activeSlide = this.activeSlide > this.slides.length - this.slidePerView ? this.slides.length - this.slidePerView : this.activeSlide;
    }

    this.slider.querySelectorAll('.slider__slide_active').forEach(slide => slide.classList.remove('slider__slide_active'));
    this.slides[this.activeSlide].classList.add('slider__slide_active');
  }
}
