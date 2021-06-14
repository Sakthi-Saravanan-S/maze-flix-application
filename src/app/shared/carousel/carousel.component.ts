import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit {
  @Input() carouselTitle: string = '';
  @Input() carouselId: number = this.mazeFlixConstants.NUMBER_0;
  constructor(
    public mazeFlixConstants: MazeFlixConstants,
    private _router: Router
  ) {}
  showList: any[] = [];
  ngOnInit(): void {}
  onTvShowClick(): void {
    this._router.navigateByUrl('/show-details', {
      state: { showId: 'showName' },
    });
  }
  setCarousalInfo(showList: any): void {
    this.showList = [];
    this.showList = JSON.parse(JSON.stringify(showList));
  }
  onLeftClick(): void {
    const slider = document.getElementById('mySlider' + this.carouselId);
    slider.scrollBy({
      top: this.mazeFlixConstants.NUMBER_0,
      left: -this.getScrollWidth(),
      behavior: 'smooth',
    });
  }
  onRightClick(): void {
    const slider = document.getElementById('mySlider' + this.carouselId);
    slider.scrollBy({
      top: this.mazeFlixConstants.NUMBER_0,
      left: +this.getScrollWidth(),
      behavior: 'smooth',
    });
  }
  getScrollWidth(): number {
    let movieWidth = document
      .querySelector('.movie')
      .getBoundingClientRect().width;
    switch (true) {
      case movieWidth * this.mazeFlixConstants.NUMBER_6 < window.innerWidth:
        return movieWidth * this.mazeFlixConstants.NUMBER_6;
      case movieWidth * this.mazeFlixConstants.NUMBER_4 < window.innerWidth:
        return movieWidth * this.mazeFlixConstants.NUMBER_4;
      case movieWidth * this.mazeFlixConstants.NUMBER_2 < window.innerWidth:
        return movieWidth * this.mazeFlixConstants.NUMBER_2;
      case movieWidth < window.innerWidth:
        return movieWidth;

      default:
        return 0;
    }
  }
}
