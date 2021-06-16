import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';

import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SearchResultComponent],
      providers: [HttpClient, HttpHandler, MazeFlixConstants],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to show details component', () => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    let showInfo = {
      id: 139,
      url: 'https://www.tvmaze.com/shows/139/girls',
      name: 'Girls',
      type: 'Scripted',
      language: 'English',
      genres: ['Drama', 'Romance'],
      status: 'Ended',
      runtime: 30,
      averageRuntime: 30,
      premiered: '2012-04-15',
      officialSite: 'http://www.hbo.com/girls',
      schedule: {
        time: '22:00',
        days: ['Sunday'],
      },
      rating: {
        average: 6.6,
      },
      weight: 95,
      network: {
        id: 8,
        name: 'HBO',
        country: {
          name: 'United States',
          code: 'US',
          timezone: 'America/New_York',
        },
      },
      externals: {
        tvrage: 30124,
        thetvdb: 220411,
        imdb: 'tt1723816',
      },
      image: {
        medium:
          'https://static.tvmaze.com/uploads/images/medium_portrait/31/78286.jpg',
        original:
          'https://static.tvmaze.com/uploads/images/original_untouched/31/78286.jpg',
      },
      summary:
        '<p>This Emmy winning series is a comic look at the assorted humiliations and rare triumphs of a group of girls in their 20s.</p>',
      updated: 1611310521,
    };
    expect(component.onTvShowClick(showInfo));
  });

  it('should Should get data from API', (done: DoneFn) => {
    const fixture = TestBed.createComponent(SearchResultComponent);
    const component = fixture.componentInstance;
    expect(component.getRequestedShowDetails('Breaking'));
    done();
  });
});
