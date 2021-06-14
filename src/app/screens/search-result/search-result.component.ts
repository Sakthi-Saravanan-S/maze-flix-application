import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { MazeFlixService } from 'src/app/service/maze-flix.service';
import { HeaderComponent } from 'src/app/shared/header/header.component';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  @ViewChild('headerComponent') headerComponent: HeaderComponent;
  routeSubscription: Subscription;
  showSearchSubscription: Subscription;
  searchedShowName: string = '';
  searchResultList: any[] = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _mazeFlixService: MazeFlixService,
    private _mazeFlixConstants: MazeFlixConstants
  ) {}
  onTvShowClick(showInfo: any[]): void {
    this._router.navigateByUrl('/show-details', {
      state: { showInfo: showInfo },
    });
  }
  getRequestedShowDetails(showName: string): void {
    this.showSearchSubscription = this._mazeFlixService
      .getRequestedShowInfo(showName)
      .subscribe(
        (result: any[]) => {
          this.searchResultList = [];
          this.searchResultList = JSON.parse(JSON.stringify(result));
        },
        () => {}
      );
  }
  ngOnInit(): void {
    this.routeSubscription = this._activatedRoute.paramMap.subscribe(() => {
      const navData = window.history.state;
      if (navData && navData.showName) {
        this.searchedShowName = navData.showName;
        this.getRequestedShowDetails(navData.showName);
      } else this._router.navigate(['']);
    });
  }
  ngAfterViewInit(): void {
    if (this.searchedShowName)
      this.headerComponent.setFormValue(this.searchedShowName);
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
    if (this.showSearchSubscription) this.showSearchSubscription.unsubscribe();
  }
}
