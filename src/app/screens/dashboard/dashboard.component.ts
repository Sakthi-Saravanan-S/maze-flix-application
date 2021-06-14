import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { MazeFlixService } from 'src/app/service/maze-flix.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private _mazeFlixService: MazeFlixService,
    private _mazeFlixConstants: MazeFlixConstants
  ) {}
  recordsSubscription: Subscription;
  sliderScrollLeft(): void {}
  sliderScrollRight(): void {}
  ngOnInit(): void {
    this.recordsSubscription = this._mazeFlixService
      .getShowsInfoByPage(this._mazeFlixConstants.NUMBER_1)
      .subscribe(
        () => {},
        () => {}
      );
  }
  ngOnDestroy(): void {
    if (this.recordsSubscription) this.recordsSubscription.unsubscribe();
  }
}
