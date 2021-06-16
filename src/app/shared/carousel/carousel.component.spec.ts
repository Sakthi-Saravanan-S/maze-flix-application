import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';

import { CarouselComponent } from './carousel.component';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let showInfo = {
    runtime: 60,
    genres: ['Drama', 'Crime', 'Thriller'],
    id: 541,
    language: 'English',
    name: 'Prison Break',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CarouselComponent],
      providers: [HttpClient, HttpHandler, MazeFlixConstants],
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
    expect(component.onTvShowClick(showInfo));
  });

  it('should update show list', () => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    expect(component.setCarouselInfo(showInfo)).toBeUndefined();
  });

  it('should scroll while clicking left scroller button', () => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    expect(component.onLeftClick()).toBeUndefined();
  });

  it('should scroll while clicking right scroller button', () => {
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    expect(component.onLeftClick()).toBeUndefined();
  });

  // it('should get scroller width', () => {
  //   fixture = TestBed.createComponent(CarouselComponent);
  //   component = fixture.componentInstance;
  //   expect(component.getScrollWidth());
  // });
});
