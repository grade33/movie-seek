import { SingleSlider } from './SingleSlider.js';

export class Slider {
  constructor(selector, obj, elem = document) {
    this.sliders = [];
    elem.querySelectorAll(selector).forEach(slider => {
      this.sliders.push(new SingleSlider(slider, obj));
    });
  }
}