import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ShowDetailsComponent } from './screens/show-details/show-details.component';
import { SearchResultComponent } from './screens/search-result/search-result.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'show-details',
    component: ShowDetailsComponent,
  },
  {
    path: 'search-results',
    component: SearchResultComponent,
  },
  { path: '**', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
