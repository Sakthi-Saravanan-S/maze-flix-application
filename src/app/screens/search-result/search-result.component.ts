import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { SearchListData } from 'src/app/model/search-list-data.model';
import { ShowListData } from 'src/app/model/show-list-data.model';
import { MazeFlixService } from 'src/app/service/maze-flix.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  @ViewChild('headerComponent') headerComponent: HeaderComponent;
  routeSubscription: Subscription;
  showSearchSubscription: Subscription;
  searchedShowName: string = '';
  searchResultList: SearchListData[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _mazeFlixService: MazeFlixService,
    private _mazeFlixConstants: MazeFlixConstants
  ) {}
  onTvShowClick(showInfo: ShowListData): void {
    if (showInfo)
      this._router.navigateByUrl('/show-details', {
        state: { showInfo: showInfo },
      });
  }
  getRequestedShowDetails(
    showName: string,
    isNavigatedFromRouter?: boolean
  ): void {
    this.searchedShowName = showName;
    this.showSearchSubscription = this._mazeFlixService
      .getRequestedShowInfo(showName)
      .subscribe(
        (result: SearchListData[]) => {
          this.searchResultList = [];
          this.searchResultList = JSON.parse(JSON.stringify(result));
          if (isNavigatedFromRouter)
            this.headerComponent.setFormValue(this.searchedShowName);
        },
        () => {}
      );
  }
  ngOnInit(): void {
    this.routeSubscription = this._activatedRoute.paramMap.subscribe(() => {
      const navData = window.history.state;
      if (navData && navData.showName) {
        this.searchedShowName = navData.showName;
        this.getRequestedShowDetails(navData.showName, true);
      } else this._router.navigate(['']);
    });
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.showSearchSubscription) this.showSearchSubscription.unsubscribe();
  }
}
