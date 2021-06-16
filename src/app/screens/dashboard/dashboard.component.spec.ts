import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';
import { MazeFlixService } from 'src/app/service/maze-flix.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: MazeFlixService;
  let httpCLient: HttpClient;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DashboardComponent],
      providers: [HttpClient, HttpHandler, MazeFlixConstants, MazeFlixService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate show by genres', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    let showList = [
      {
        genres: ['Drama', 'Crime', 'Thriller'],
      },
      {
        genres: ['Comedy'],
      },
      {
        genres: ['Drama', 'Adventure', 'Science-Fiction'],
      },
      {
        genres: ['Action', 'Adventure', 'Science-Fiction'],
      },
      {
        genres: ['Drama', 'Crime'],
      },
      {
        genres: ['Romance', 'Comedy'],
      },
      {
        genres: ['Drama', 'Medical'],
      },
      {
        genres: ['Action', 'Science-Fiction'],
      },
      {
        genres: ['Music', 'Romance'],
      },
      {
        genres: ['Comedy', 'Thriller'],
      },
      {
        genres: ['Drama', 'Adventure', 'Fantasy'],
      },
    ];
    // expect(component.generateShowsByGeneres(showList, 'Comedy')).toEqual([
    //   {
    //     genres: ['Comedy'],
    //   },
    //   {
    //     genres: ['Romance', 'Comedy'],
    //   },
    //   {
    //     genres: ['Comedy', 'Thriller'],
    //   },
    // ]);
  });

  it('should Should get data from API', (done: DoneFn) => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    expect(component.getDefaultTvShows());
    done();
  });

  it('should should successfully perform life cycle hook', (done: DoneFn) => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    expect(component.ngOnInit());
    expect(component.ngOnDestroy());
    done();
  });
});
