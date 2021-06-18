import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ShowDetailsComponent } from './screens/show-details/show-details.component';
import { MazeFlixConstants } from './constants/maze-flix.constants';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { MazeFlixService } from './service/maze-flix.service';
import { SearchResultComponent } from './screens/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    ShowDetailsComponent,
    CarouselComponent,
    SearchResultComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  exports: [HeaderComponent, CarouselComponent],
  providers: [MazeFlixConstants, MazeFlixService],
  bootstrap: [AppComponent],
})
export class AppModule {}
