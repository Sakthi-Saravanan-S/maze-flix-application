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
    btnLeft.addEventListener('click', (e) => {
      let movieWidth = document
        .querySelector('.movie')
        .getBoundingClientRect().width;
      let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

      slider.scrollBy({
        top: 0,
        left: -scrollDistance,
        behavior: 'smooth',
      });
      this.activeIndex = (this.activeIndex - 1) % 3;
      console.log(this.activeIndex);
    });
  }
  onRightClick(): void {
    const btnRight = document.getElementById('moveRight' + this.carouselId);
    const slider = document.getElementById('mySlider' + this.carouselId);
    btnRight.addEventListener('click', (e) => {
      let movieWidth = document
        .querySelector('.movie')
        .getBoundingClientRect().width;
      let scrollDistance = movieWidth * 6; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)

      console.log(`movieWidth = ${movieWidth}`);
      console.log(`scrolling right ${scrollDistance}`);

      // if we're on the last page
      if (this.activeIndex == 2) {
        // duplicate all the items in the slider (this is how we make 'looping' slider)
        // this.populateSlider();
        slider.scrollBy({
          top: 0,
          left: +scrollDistance,
          behavior: 'smooth',
        });
        this.activeIndex = 0;
      } else {
        slider.scrollBy({
          top: 0,
          left: +scrollDistance,
          behavior: 'smooth',
        });
        this.activeIndex = (this.activeIndex + 1) % 3;
        console.log(this.activeIndex);
      }
    });
  }
}
