import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { ShowListData } from 'src/app/model/show-list-data.model';
import { MazeFlixService } from 'src/app/service/maze-flix.service';
import { CarouselComponent } from 'src/app/shared-components/carousel/carousel.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild('topRatedCarousel') topRatedCarousel: CarouselComponent;
  @ViewChild('selectedGenreCarousel') selectedGenreCarousel: CarouselComponent;
  recordsSubscription: Subscription;
  genreList: string[] = [];
  genreTitle: string = '';
  defaultShowList: ShowListData[] = [];
  constructor(
    private _mazeFlixService: MazeFlixService,
    private _router: Router,
    public mazeFlixConstants: MazeFlixConstants
  ) {}
  onGenreListChange(genre: string): void {
    this.genreTitle = genre;
    this.selectedGenreCarousel.setCarouselInfo(
      this.generateShowsByGeneres(this.defaultShowList, this.genreTitle)
    );
  }
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
      this.mazeFlixConstants.NUMBER_0,
      this.mazeFlixConstants.SLIDER_LIMIT
    );
  }
  ngOnInit(): void {
    this.genreList = [];
    this.genreTitle = '';
    this.recordsSubscription = this._mazeFlixService
      .getDefaultTvShowsInfo()
      .subscribe(
        (result: ShowListData[]) => {
          result.sort(
            (a: ShowListData, b: ShowListData) =>
              b.rating.average - a.rating.average
          );
          const topRatedShows = result.slice(
            this.mazeFlixConstants.NUMBER_0,
            this.mazeFlixConstants.SLIDER_LIMIT
          );
          result.forEach((showInfo) => {
            showInfo.genres.forEach((genreInfo) => {
              if (this.genreList.indexOf(genreInfo) === -1) {
                this.genreList.push(genreInfo);
              }
            });
          });
          this.genreTitle = this.genreList[this.mazeFlixConstants.NUMBER_0];
          this.selectedGenreCarousel.setCarouselInfo(
            this.generateShowsByGeneres(result, this.genreTitle)
          );
          this.topRatedCarousel.setCarouselInfo(topRatedShows);
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
