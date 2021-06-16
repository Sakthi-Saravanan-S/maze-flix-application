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
      runtime: 60,
      genres: ['Drama', 'Crime', 'Thriller'],
      id: 541,
      language: 'English',
      name: 'Prison Break',
    };
    expect(component.onTvShowClick(showInfo));
  });

  it('should Should get data from API', (done: DoneFn) => {
    const fixture = TestBed.createComponent(SearchResultComponent);
    const component = fixture.componentInstance;
    expect(component.getRequestedShowDetails("Breaking"));
    done();
  });

  it('should should successfully perform life cycle hook', (done: DoneFn) => {
    const fixture = TestBed.createComponent(SearchResultComponent);
    const component = fixture.componentInstance;
    expect(component.ngOnInit());
    expect(component.ngOnDestroy());
    done();
  });
});
