import { HttpClient, HttpHandler } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { ShowListData } from 'src/app/model/show-list-data.model';
import { MazeFlixService } from 'src/app/service/maze-flix.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let showList: ShowListData[];
  let mockMazeFlixService: MazeFlixService;
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent],
      providers: [
        HttpClient,
        HttpHandler,
        MazeFlixConstants,
        MazeFlixService,
        { provide: Router, useValue: routerSpy },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockMazeFlixService = TestBed.inject(MazeFlixService);
    showList = [
      {
        id: 250,
        url: 'https://www.tvmaze.com/shows/250/kirby-buckets',
        name: 'Kirby Buckets',
        type: 'Scripted',
        language: 'English',
        genres: ['Comedy'],
        status: 'Ended',
        runtime: 30,
        averageRuntime: 30,
        premiered: '2014-10-20',
        officialSite: 'http://disneyxd.disney.com/kirby-buckets',
        schedule: {
          time: '07:00',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        rating: {
          average: null,
        },
        weight: 0,
        network: {
          id: 25,
          name: 'Disney XD',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
        },
        externals: {
          tvrage: 37394,
          thetvdb: 278449,
          imdb: 'tt3544772',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg',
        },
        summary:
          "<p>The single-camera series that mixes live-action and animation stars Jacob Bertrand as the title character. <b>Kirby Buckets</b> introduces viewers to the vivid imagination of charismatic 13-year-old Kirby Buckets, who dreams of becoming a famous animator like his idol, Mac MacCallister. With his two best friends, Fish and Eli, by his side, Kirby navigates his eccentric town of Forest Hills where the trio usually find themselves trying to get out of a predicament before Kirby's sister, Dawn, and her best friend, Belinda, catch them. Along the way, Kirby is joined by his animated characters, each with their own vibrant personality that only he and viewers can see.</p>",
        updated: 1617744408,
      },
      {
        id: 251,
        url: 'https://www.tvmaze.com/shows/251/downton-abbey',
        name: 'Downton Abbey',
        type: 'Scripted',
        language: 'English',
        genres: ['Drama', 'Family', 'Romance'],
        status: 'Ended',
        runtime: 60,
        averageRuntime: 71,
        premiered: '2010-09-26',
        officialSite: 'http://www.itv.com/downtonabbey',
        schedule: {
          time: '21:00',
          days: ['Sunday'],
        },
        rating: {
          average: 9.1,
        },
        weight: 96,
        network: {
          id: 35,
          name: 'ITV',
          country: {
            name: 'United Kingdom',
            code: 'GB',
            timezone: 'Europe/London',
          },
        },
        externals: {
          tvrage: 26615,
          thetvdb: 193131,
          imdb: 'tt1606375',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/1/4601.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/1/4601.jpg',
        },
        summary:
          "<p>The Downton Abbey estate stands a splendid example of confidence and mettle, its family enduring for generations and its staff a well-oiled machine of propriety. But change is afoot at Downton--change far surpassing the new electric lights and telephone. A crisis of inheritance threatens to displace the resident Crawley family, in spite of the best efforts of the noble and compassionate Earl, Robert Crawley; his American heiress wife, Cora his comically implacable, opinionated mother, Violet and his beautiful, eldest daughter, Mary, intent on charting her own course. Reluctantly, the family is forced to welcome its heir apparent, the self-made and proudly modern Matthew Crawley himself none too happy about the new arrangements. As Matthew's bristly relationship with Mary begins to crackle with electricity, hope for the future of Downton's dynasty takes shape. But when petty jealousies and ambitions grow among the family and the staff, scheming and secrets--both delicious and dangerous--threaten to derail the scramble to preserve Downton Abbey. <i>Downton Abbey</i> offers a spot-on portrait of a vanishing way of life.</p>",
        updated: 1623600859,
      },
      {
        id: 252,
        url: 'https://www.tvmaze.com/shows/252/girl-meets-world',
        name: 'Girl Meets World',
        type: 'Scripted',
        language: 'English',
        genres: ['Drama', 'Family'],
        status: 'Ended',
        runtime: 30,
        averageRuntime: 30,
        premiered: '2014-06-27',
        officialSite: 'http://disneychannel.disney.com/girl-meets-world',
        schedule: {
          time: '18:00',
          days: ['Friday'],
        },
        rating: {
          average: 7.7,
        },
        weight: 80,
        network: {
          id: 78,
          name: 'Disney Channel',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
        },
        externals: {
          tvrage: 33436,
          thetvdb: 267777,
          imdb: 'tt2543796',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/316/792450.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/316/792450.jpg',
        },
        summary:
          "<p><b>Girl Meets World</b> is based on ABC's hugely popular sitcom, Boy Meets World (1993). Set in New York City, the show tells the wonderfully funny heartfelt stories that Boy Meets World is renowned for - only this time from a tween girl's perspective - as the curious and bright 7th grader Riley Matthews and her quick-witted friend Maya Fox embark on an unforgettable middle school experience. But their plans for a carefree year will be adjusted slightly under the watchful eyes of Riley's parents - dad Cory, who's also a faculty member (and their new History teacher), and mom Topanga, who owns a trendy after school hangout that specializes in pudding.</p>",
        updated: 1621082326,
      },
      {
        id: 253,
        url: 'https://www.tvmaze.com/shows/253/hells-kitchen',
        name: "Hell's Kitchen",
        type: 'Reality',
        language: 'English',
        genres: ['Food'],
        status: 'Running',
        runtime: 60,
        averageRuntime: 60,
        premiered: '2005-05-30',
        officialSite: 'http://www.fox.com/hells-kitchen',
        schedule: {
          time: '20:00',
          days: ['Monday'],
        },
        rating: {
          average: 7,
        },
        weight: 99,
        network: {
          id: 4,
          name: 'FOX',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
        },
        externals: {
          tvrage: 3828,
          thetvdb: 74897,
          imdb: 'tt0437005',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/324/811405.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/324/811405.jpg',
        },
        summary:
          "<p>In <b>Hell's Kitchen</b>, aspiring chefs are put through an intense culinary academy to prove they possess the right combination of ingredients to win a life-changing grand prize.</p>",
        updated: 1623743349,
      },
      {
        id: 254,
        url: 'https://www.tvmaze.com/shows/254/world-series-of-poker',
        name: 'World Series of Poker',
        type: 'Sports',
        language: 'English',
        genres: [],
        status: 'Running',
        runtime: 60,
        averageRuntime: 65,
        premiered: '2006-08-22',
        officialSite: null,
        schedule: {
          time: '21:00',
          days: ['Monday', 'Tuesday', 'Sunday'],
        },
        rating: {
          average: 9,
        },
        weight: 0,
        network: {
          id: 180,
          name: 'ESPN2',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
        },
        externals: {
          tvrage: 16764,
          thetvdb: 79028,
          imdb: 'tt2733512',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/1/4656.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/1/4656.jpg',
        },
        summary:
          "<p>The <b>World Series of Poker</b> is where the world's best poker players battle for the title.</p>",
        updated: 1574298803,
      },
    ];
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate show by genres', () => {
    expect(component.generateShowsByGeneres(showList, 'Comedy')).toEqual([
      {
        id: 250,
        url: 'https://www.tvmaze.com/shows/250/kirby-buckets',
        name: 'Kirby Buckets',
        type: 'Scripted',
        language: 'English',
        genres: ['Comedy'],
        status: 'Ended',
        runtime: 30,
        averageRuntime: 30,
        premiered: '2014-10-20',
        officialSite: 'http://disneyxd.disney.com/kirby-buckets',
        schedule: {
          time: '07:00',
          days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        },
        rating: {
          average: null,
        },
        weight: 0,
        network: {
          id: 25,
          name: 'Disney XD',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York',
          },
        },
        externals: {
          tvrage: 37394,
          thetvdb: 278449,
          imdb: 'tt3544772',
        },
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg',
        },
        summary:
          "<p>The single-camera series that mixes live-action and animation stars Jacob Bertrand as the title character. <b>Kirby Buckets</b> introduces viewers to the vivid imagination of charismatic 13-year-old Kirby Buckets, who dreams of becoming a famous animator like his idol, Mac MacCallister. With his two best friends, Fish and Eli, by his side, Kirby navigates his eccentric town of Forest Hills where the trio usually find themselves trying to get out of a predicament before Kirby's sister, Dawn, and her best friend, Belinda, catch them. Along the way, Kirby is joined by his animated characters, each with their own vibrant personality that only he and viewers can see.</p>",
        updated: 1617744408,
      },
    ]);
  });

  it('should call data from API and update default show list information', fakeAsync(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    spyOn(mockMazeFlixService, 'getDefaultTvShowsInfo').and.callFake(() => {
      return of(showList).pipe(delay(500));
    });
    component.ngOnInit();
    tick(500);
    expect(component.defaultShowList.length).toBeGreaterThan(0);
  }));

  it(`should navigate to search result page`, () => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.getRequestedShowDetails('Breaking');
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/search-results', {
      state: { showName: 'Breaking' },
    });
  });
});
