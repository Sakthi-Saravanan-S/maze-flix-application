import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { ShowListData } from 'src/app/model/show-list-data.model';
import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let showInfo: ShowListData = {
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
  };
  let routerSpy = { navigateByUrl: jasmine.createSpy('navigateByUrl') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CarouselComponent],
      providers: [
        HttpClient,
        HttpHandler,
        MazeFlixConstants,
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to show details component', () => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    component.onTvShowClick(showInfo);
    expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('/show-details', {
      state: { showInfo: showInfo },
    });
  });

  it('Set carousel info should update show list', () => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.setCarouselInfo([showInfo]);
    expect(component.showList.length).toBeGreaterThan(0);
  });

  it('should scroll while clicking left scroller button', () => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    component.showList.push(showInfo);
    fixture.detectChanges();
    const sliderContainer = fixture.nativeElement.querySelector('#slider_0');
    spyOn(sliderContainer, 'scrollBy');
    component.onLeftClick();
    expect(sliderContainer).toBeTruthy();
  });

  it('should scroll while clicking right scroller button', () => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    component.showList.push(showInfo);
    fixture.detectChanges();
    const sliderContainer = fixture.nativeElement.querySelector('#slider_0');
    spyOn(sliderContainer, 'scrollBy');
    component.onRightClick();
    expect(sliderContainer).toBeTruthy();
  });
});
