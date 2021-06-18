import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { ShowListData } from 'src/app/model/show-list-data.model';

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
  showList: ShowListData[] = [];
  onTvShowClick(showInfo: ShowListData): void {
    this._router.navigateByUrl('/show-details', {
      state: { showInfo: showInfo },
    });
  }
  setCarouselInfo(showList: ShowListData[]): void {
    this.showList = [];
    this.showList = JSON.parse(JSON.stringify(showList));
  }
  onLeftClick(): void {
    const slider = document.getElementById(`slider_${this.carouselId}`);
    slider.scrollBy({
      top: this.mazeFlixConstants.NUMBER_0,
      left: -document.body.scrollWidth,
      behavior: 'smooth',
    });
  }
  onRightClick(): void {
    const slider = document.getElementById(`slider_${this.carouselId}`);
    slider.scrollBy({
      top: this.mazeFlixConstants.NUMBER_0,
      left: +document.body.scrollWidth,
      behavior: 'smooth',
    });
  }
  ngOnInit(): void {}
}
