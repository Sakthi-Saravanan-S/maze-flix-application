import { HttpClient, HttpHandler } from '@angular/common/http';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { SearchListData } from 'src/app/model/search-list-data.model';
import { ShowListData } from 'src/app/model/show-list-data.model';
import { MazeFlixService } from 'src/app/service/maze-flix.service';
import { HeaderComponent } from 'src/app/shared-components/header/header.component';
import { SearchResultComponent } from './search-result.component';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;
  let fixture: ComponentFixture<SearchResultComponent>;
  let mockMazeFlixService: MazeFlixService;
  let showInfo: ShowListData;
  let searchList: SearchListData[];
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
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [SearchResultComponent, HeaderComponent],
      providers: [
        HttpClient,
        HttpHandler,
        MazeFlixService,
        MazeFlixConstants,
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockMazeFlixService = TestBed.inject(MazeFlixService);
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
    searchList = [
      {
        score: '20.2456',
        show: showInfo,
      },
    ];
    window.history.pushState({ showName: showInfo.name }, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call API and found no matching records found', fakeAsync(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    let emptyRecord: SearchListData[] = [];
    spyOn(mockMazeFlixService, 'getRequestedShowInfo').and.callFake(() => {
      return of(emptyRecord).pipe(delay(500));
    });
    component.getRequestedShowDetails('dsadsadsadsa');
    tick(500);
    expect(component.searchResultList.length).toBe(0);
  }));

  it('should call API and update search list information', fakeAsync(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    spyOn(mockMazeFlixService, 'getRequestedShowInfo').and.callFake(() => {
      return of(searchList).pipe(delay(500));
    });
    component.getRequestedShowDetails(showInfo.name);
    tick(500);
    expect(component.searchResultList.length).toBeGreaterThan(0);
  }));

  it('should call API and set show name in child component', fakeAsync(() => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    component.headerComponent =
      TestBed.createComponent(HeaderComponent).componentInstance;
    component.headerComponent.ngOnInit();
    spyOn(mockMazeFlixService, 'getRequestedShowInfo').and.callFake(() => {
      return of(searchList).pipe(delay(500));
    });
    component.getRequestedShowDetails(showInfo.name, true);
    tick(500);
    expect(component.searchResultList.length).toBeGreaterThan(0);
  }));

  it(`should navigate to show details page`, () => {
    fixture = TestBed.createComponent(SearchResultComponent);
    component = fixture.componentInstance;
    component.onTvShowClick(showInfo);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith(
      `/show-details/${showInfo.id}`,
      {
        state: { showInfo: showInfo },
      }
    );
  });
});
