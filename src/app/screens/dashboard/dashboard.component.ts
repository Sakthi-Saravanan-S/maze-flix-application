import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { MazeFlixService } from 'src/app/service/maze-flix.service';
import { CarouselComponent } from 'src/app/shared/carousel/carousel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('topRatedCarousel') topRatedCarousel: CarouselComponent;
  @ViewChild('genre1Carousel') genre1Carousel: CarouselComponent;
  @ViewChild('genre2Carousel') genre2Carousel: CarouselComponent;
  @ViewChild('genre3Carousel') genre3Carousel: CarouselComponent;
  @ViewChild('genre4Carousel') genre4Carousel: CarouselComponent;
  @ViewChild('genre5Carousel') genre5Carousel: CarouselComponent;
  @ViewChild('genre6Carousel') genre6Carousel: CarouselComponent;
  constructor(
    private _mazeFlixService: MazeFlixService,
    private _mazeFlixConstants: MazeFlixConstants
  ) {}
  recordsSubscription: Subscription;
  generateShowsByGeneres(showList: any[], genre: string): any[] {
    let updatedShowList = [];
    updatedShowList = showList.filter((showInfo) => {
      const isGenreFounded = showInfo.genres.some((genreInfo) => {
        return genreInfo === genre;
      });
      return isGenreFounded;
    });
    return updatedShowList.slice(
      this._mazeFlixConstants.NUMBER_0,
      this._mazeFlixConstants.SLIDER_LIMIT
    );
  }
  ngOnInit(): void {
    this.recordsSubscription = this._mazeFlixService
      .getShowsInfoByPage(this._mazeFlixConstants.NUMBER_1)
      .subscribe(
        (result: any[]) => {
          let updData = [];
          result.sort(
            (a: any, b: any) => b.rating?.average - a.rating?.average
          );
          const topRatedShows = result.slice(
            this._mazeFlixConstants.NUMBER_0,
            this._mazeFlixConstants.SLIDER_LIMIT
          );
          this.topRatedCarousel.setCarousalInfo(topRatedShows);
          this.genre1Carousel.setCarousalInfo(
            this.generateShowsByGeneres(result, 'Science-Fiction')
          );
          this.genre2Carousel.setCarousalInfo(
            this.generateShowsByGeneres(result, 'Horror')
          );
          this.genre3Carousel.setCarousalInfo(
            this.generateShowsByGeneres(result, 'Crime')
          );
          this.genre4Carousel.setCarousalInfo(
            this.generateShowsByGeneres(result, 'Action')
          );
          this.genre5Carousel.setCarousalInfo(
            this.generateShowsByGeneres(result, 'Comedy')
          );
          this.genre6Carousel.setCarousalInfo(
            this.generateShowsByGeneres(result, 'Family')
          );
        },
        () => {}
      );
  }
  ngOnDestroy(): void {
    if (this.recordsSubscription) this.recordsSubscription.unsubscribe();
  }
}
