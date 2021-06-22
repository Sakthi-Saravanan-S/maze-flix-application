import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SearchListData } from 'src/app/model/search-list-data.model';
import { ShowListData } from 'src/app/model/show-list-data.model';
import { MazeFlixService } from 'src/app/service/maze-flix.service';
import { HeaderComponent } from 'src/app/shared-components/header/header.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  @ViewChild('headerComponent') headerComponent: HeaderComponent;
  routeSubscription: Subscription;
  showSearchSubscription: Subscription;
  searchedShow: { [key: string]: string | boolean } = {
    name: '',
    isRecordFound: true,
  };
  searchedShowName: string = '';
  searchResultList: SearchListData[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _mazeFlixService: MazeFlixService
  ) {}
  onTvShowClick(showInfo: ShowListData): void {
    this._router.navigateByUrl(`/show-details/${showInfo.id}`, {
      state: { showInfo: showInfo },
    });
  }
  getRequestedShowDetails(
    showName: string,
    isNavigatedFromRouter?: boolean
  ): void {
    this.searchedShow.name = showName;
    this.showSearchSubscription = this._mazeFlixService
      .getRequestedShowInfo(showName)
      .subscribe(
        (result: SearchListData[]) => {
          this.searchResultList = [];
          this.searchedShow.isRecordFound = false;
          if (result && result.length) {
            this.searchResultList = JSON.parse(JSON.stringify(result));
            this.searchedShow.isRecordFound = true;
          }
          if (isNavigatedFromRouter)
            this.headerComponent.setFormValue(showName);
        },
        () => {
          this.searchedShow.isRecordFound = false;
        }
      );
  }
  ngOnInit(): void {
    this.routeSubscription = this._activatedRoute.paramMap.subscribe(() => {
      const navData = window.history.state;
      if (navData && navData.showName) {
        this.searchedShow.name = navData.showName;
        this.getRequestedShowDetails(navData.showName, true);
      } else {
        this._router.navigate(['']);
      }
    });
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.showSearchSubscription) {
      this.showSearchSubscription.unsubscribe();
    }
  }
}
