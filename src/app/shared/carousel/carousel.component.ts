import { Component, Input, OnInit } from '@angular/core';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() carouselTitle: string = '';
  @Input() carouselId: number = this.mazeFlixConstants.NUMBER_0;
  // baseSliderWidth = this.slider.offsetWidth;
  activeIndex = 0;
  constructor(public mazeFlixConstants: MazeFlixConstants) {}
  movies = [
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
    {
      src: 'https://static.tvmaze.com/uploads/images/original_untouched/4/10448.jpg',
    },
  ];
  ngOnInit(): void {
    // this.populateSlider();
  }
  populateSlider() {
    const slider = document.getElementById('mySlider' + this.carouselId);
    this.movies.forEach((image) => {
      // Clone the initial movie thats included in the html, then replace the image with a different one
      const newMovie = document.getElementById('movie' + this.carouselId);
      let clone: any = newMovie.cloneNode(true);
      let img = clone.querySelector('img');
      img.src = image.src;
      slider.insertBefore(
        clone,
        slider.childNodes[slider.childNodes.length - 1]
      );
    });
  }
  onLeftClick(): void {
    const btnLeft = document.getElementById('moveLeft' + this.carouselId);
    const slider = document.getElementById('mySlider' + this.carouselId);
    slider.scrollBy({
      top: 0,
      left: -this.getScrollWidth(),
      behavior: 'smooth',
    });
  }
  onRightClick(): void {
    const btnRight = document.getElementById('moveRight' + this.carouselId);
    const slider = document.getElementById('mySlider' + this.carouselId);
    slider.scrollBy({
      top: 0,
      left: +this.getScrollWidth(),
      behavior: 'smooth',
    });
  }
  getScrollWidth(): number {
    let movieWidth = document
      .querySelector('.movie')
      .getBoundingClientRect().width;
    switch (true) {
      case movieWidth * 6 < window.innerWidth:
        return movieWidth * 6;
      case movieWidth * 4 < window.innerWidth:
        return movieWidth * 4;
      case movieWidth * 2 < window.innerWidth:
        return movieWidth * 2;
      case movieWidth < window.innerWidth:
        return movieWidth;

      default:
        return 0;
    }
  }
}
