import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { CastListData } from 'src/app/model/cast-list-data.model';
import { ShowListData } from 'src/app/model/show-list-data.model';
import { MazeFlixService } from 'src/app/service/maze-flix.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  castDetailSubscription: Subscription;
  showDetail: ShowListData;
  castDetail: CastListData[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _mazeFlixService: MazeFlixService,
    private _mazeFlixConstants: MazeFlixConstants
  ) {}
  getRequestedShowDetails(showName: string): void {
    this._router.navigateByUrl('/search-results', {
      state: { showName: showName },
    });
  }
  getCastInformation(showInfo: ShowListData): void {
    this.showDetail = JSON.parse(JSON.stringify(showInfo));
    this.castDetailSubscription = this._mazeFlixService
      .getCastInfo(showInfo.id)
      .subscribe(
        (result: CastListData[]) => {
          this.castDetail = [];
          this.castDetail = result.slice(
            this._mazeFlixConstants.NUMBER_0,
            this._mazeFlixConstants.NUMBER_3
          );
        },
        () => {}
      );
  }
  ngOnInit(): void {
    this.routeSubscription = this._activatedRoute.paramMap.subscribe(() => {
      const navData = window.history.state;
      if (navData && navData.showInfo)
        this.getCastInformation(navData.showInfo);
      else this._router.navigate(['']);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.castDetailSubscription) {
      this.castDetailSubscription.unsubscribe();
    }
  }
}
