import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { CastListData } from 'src/app/model/cast-list-data.model';
import { ShowListData } from 'src/app/model/show-list-data.model';
import { MazeFlixService } from 'src/app/service/maze-flix.service';
import { ShowDetailsComponent } from './show-details.component';
import { delay } from 'rxjs/operators';

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;
  let mockMazeFlixService: MazeFlixService;
  let showInfo: ShowListData;
  let castInfo: CastListData[] = [];
  let routerSpy = {
    navigateByUrl: jasmine.createSpy('navigateByUrl'),
    navigate: jasmine.createSpy('navigate'),
  };
  const activatedRouteStub = {
    paramMap: of({
      navData: window.history.state,
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ShowDetailsComponent],
      providers: [
        HttpClient,
        HttpHandler,
        MazeFlixConstants,
        MazeFlixService,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    showInfo = {
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
    castInfo = [
      {
        person: {
          id: 1,
          url: 'https://www.tvmaze.com/people/1/mike-vogel',
          name: 'Mike Vogel',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
          birthday: '1979-07-17',
          gender: 'Male',
          image: {
            medium:
              'https://static.tvmaze.com/uploads/images/medium_portrait/0/1815.jpg',
            original:
              'https://static.tvmaze.com/uploads/images/original_untouched/0/1815.jpg',
          },
        },
        character: {
          id: 1,
          url: 'https://www.tvmaze.com/characters/1/under-the-dome-dale-barbie-barbara',
          name: 'Dale "Barbie" Barbara',
          image: {
            medium:
              'https://static.tvmaze.com/uploads/images/medium_portrait/0/3.jpg',
            original:
              'https://static.tvmaze.com/uploads/images/original_untouched/0/3.jpg',
          },
        },
        self: false,
        voice: false,
      },
    ];
    mockMazeFlixService = TestBed.inject(MazeFlixService);
    window.history.pushState({ showInfo: showInfo }, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call data from API and update cast list information', fakeAsync(() => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    spyOn(mockMazeFlixService, 'getCastInfo').and.callFake(() => {
      return of(castInfo).pipe(delay(500));
    });
    component.getCastInformation(showInfo);
    tick(500);
    expect(component.castDetail.length).toBeGreaterThan(0);
  }));

  it(`should navigate to search result page`, () => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.getRequestedShowDetails('Breaking');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/search-results', {
      state: { showName: 'Breaking' },
    });
  });

  it(`should navigate to landing page`, () => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    window.history.pushState({ showInfo: null }, '', '');
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['']);
  });
});
