import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { MazeFlixService } from 'src/app/service/maze-flix.service';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  castDetailSubscription: Subscription;
  showDetail: any = null;
  castDetail: any[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _mazeFlixService: MazeFlixService,
    private _mazeFlixConstants: MazeFlixConstants
  ) {}
  getRequestedShowDetails(showInfo: any): void {
    this.showDetail = JSON.parse(JSON.stringify(showInfo));
    this.castDetailSubscription = this._mazeFlixService
      .getCastInfo(showInfo.id)
      .subscribe(
        (result: any[]) => {
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
        this.getRequestedShowDetails(navData.showInfo);
      else this._router.navigate(['']);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.castDetailSubscription) this.castDetailSubscription.unsubscribe();
  }
}
