import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MazeFlixConstants } from 'src/app/constants/maze-flix.constants';

import { ShowDetailsComponent } from './show-details.component';

describe('ShowDetailsComponent', () => {
  let component: ShowDetailsComponent;
  let fixture: ComponentFixture<ShowDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ShowDetailsComponent],
      providers: [HttpClient, HttpHandler,MazeFlixConstants],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should Should get data from API', (done: DoneFn) => {
    const fixture = TestBed.createComponent(ShowDetailsComponent);
    const component = fixture.componentInstance;
    expect(component.getRequestedShowDetails("169"));
    done();
  });

  it('should should successfully perform life cycle hook', (done: DoneFn) => {
    const fixture = TestBed.createComponent(ShowDetailsComponent);
    const component = fixture.componentInstance;
    expect(component.ngOnInit());
    expect(component.ngOnDestroy());
    done();
  });
});
