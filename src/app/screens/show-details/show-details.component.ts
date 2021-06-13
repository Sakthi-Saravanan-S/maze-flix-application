import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.scss'],
})
export class ShowDetailsComponent implements OnInit, OnDestroy {
  routeSubscription?: Subscription;
  constructor(public activatedRoute: ActivatedRoute, private _router: Router) {}
  getRequestedShowDetails(showName: string): void {}
  ngOnInit(): void {
    this.routeSubscription = this.activatedRoute.paramMap.subscribe(() => {
      const navData = window.history.state;
      if (navData && navData.showName)
        this.getRequestedShowDetails(navData.showName);
      else this._router.navigate(['']);
    });
  }
  ngOnDestroy(): void {
    if (this.routeSubscription) this.routeSubscription.unsubscribe();
  }
}
