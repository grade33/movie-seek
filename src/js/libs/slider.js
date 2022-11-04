class Slider {
  scrolledPosition = 0;

  constructor(selector, {
    gap = 0,
    slidePerView = 1,
    slidePerGroup = 1,
    speed = 300,
  }) {
    // Selector
    this.mainSelector = '.slider';

    // DOM Elements
    this.slider = document.querySelector(selector);
    this.wrapper = this.slider.querySelector(`${this.mainSelector}__wrapper`);
    this.slides = this.slider.querySelectorAll(`${this.mainSelector}__slide`);
    this.btnPrev = this.slider.querySelector(`${this.mainSelector}__btn_prev`);
    this.btnNext = this.slider.querySelector(`${this.mainSelector}__btn_next`);

    // Settings
    this.slidePerView = slidePerView;
    this.slidePerGroup = slidePerGroup;
    this.gap = gap;
    this.speed = speed;
    this.activeSlides = this.slidePerView - 1;
    for (let i = this.activeSlides; i > -1; i--) {
      this.slides[i].classList.add('slider__slide_active');
    } 

    // Functions Call
    this.setSlidesWidth();
    this.setGap();
    this.setSlidesSpeed();
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
    this.setActiveSlides('prev');
  }

  nextSlide() {
    const maxScrolledPosition = this.wrapper.scrollWidth - this.wrapper.offsetWidth;
    this.scrolledPosition += this.getMovePoint();
    this.scrolledPosition = this.scrolledPosition > maxScrolledPosition ? maxScrolledPosition : this.scrolledPosition;
    this.wrapper.style.transform = `translateX(-${this.scrolledPosition}px)`;
    this.setActiveSlides('next');
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

  setActiveSlides(prevOrNext) {
    document.querySelectorAll('.slider__slide_active').forEach(activeSlide => {
      activeSlide.classList.remove('slider__slide_active');
    });
    if(prevOrNext === 'prev') {
      this.activeSlides -= this.slidePerGroup;
      this.activeSlides = this.activeSlides <= 0 ? this.slidePerView - 1 : this.activeSlides;
    } else if(prevOrNext === 'next') {
      this.activeSlides += this.slidePerGroup;
      this.activeSlides = this.activeSlides > this.slides.length - 1 ? this.slides.length - 1 : this.activeSlides;
    }
    for (let i = this.activeSlides; i > this.activeSlides - this.slidePerView; i--) {
      this.slides[i].classList.add('slider__slide_active');
    }
  }
}

export {
  Slider
};
