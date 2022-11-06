import { SingleSlider } from './SingleSlider.js';

export class Slider {
  constructor(selector, obj) {
    this.sliders = [];
    document.querySelectorAll(selector).forEach(slider => {
      this.sliders.push(new SingleSlider(slider, obj));
    });
  }
}