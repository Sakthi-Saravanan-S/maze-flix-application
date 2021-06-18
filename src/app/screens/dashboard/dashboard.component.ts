import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { ShowListData } from 'src/app/model/show-list-data.model';
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
  recordsSubscription: Subscription;
  genreList: string[] = [
    'Science-Fiction',
    'Mystery',
    'Crime',
    'Action',
    'Comedy',
    'Family',
  ];
  defaultShowList: ShowListData[] = [];
  constructor(
    private _mazeFlixService: MazeFlixService,
    private _mazeFlixConstants: MazeFlixConstants,
    private _router: Router
  ) {}
  getRequestedShowDetails(showName: string): void {
    this._router.navigateByUrl('/search-results', {
      state: { showName: showName },
    });
  }
  generateShowsByGeneres(
    showList: ShowListData[],
    genre: string
  ): ShowListData[] {
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
      .getDefaultTvShowsInfo()
      .subscribe(
        (result: ShowListData[]) => {
          result.sort(
            (a: ShowListData, b: ShowListData) =>
              b.rating.average - a.rating.average
          );
          const topRatedShows = result.slice(
            this._mazeFlixConstants.NUMBER_0,
            this._mazeFlixConstants.SLIDER_LIMIT
          );
          if (this.topRatedCarousel) {
            this.genreList.forEach((genre, index) => {
              const childName = `genre${index + 1}Carousel`;
              this[childName].setCarouselInfo(
                this.generateShowsByGeneres(result, genre)
              );
              this.genre1Carousel.setCarouselInfo(
                this.generateShowsByGeneres(result, genre)
              );
            });
            this.topRatedCarousel.setCarouselInfo(topRatedShows);
          }
          this.defaultShowList = [];
          this.defaultShowList = result;
        },
        () => {}
      );
  }
  ngOnDestroy(): void {
    if (this.recordsSubscription) {
      this.recordsSubscription.unsubscribe();
    }
  }
}
