import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
  routeSubscription: Subscription;
  showDetail: any = null;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}
  getRequestedShowDetails(showInfo: any): void {
    this.showDetail = JSON.parse(JSON.stringify(showInfo));
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
  }
}
