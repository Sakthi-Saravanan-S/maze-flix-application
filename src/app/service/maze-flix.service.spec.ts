import { HttpClient, HttpHandler } from '@angular/common/http';
import { inject, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { MazeFlixService } from './maze-flix.service';

describe('MazeFlixService', () => {
  let service: MazeFlixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler],
    });
    service = TestBed.inject(MazeFlixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get data from default Tv show API', (done: DoneFn) => {
    service.getTvShowsInfo().subscribe(
      (value) => {
        const recordsLength = value.length;
        expect(recordsLength).toBeGreaterThan(0);
        done();
      },
      (error) => {
        expect(error).toBeDefined();
        done();
      }
    );
  });

  it('Get data from search show API', (done: DoneFn) => {
    service.getRequestedShowInfo('Breaking').subscribe(
      (value) => {
        expect(value.length).toBeGreaterThan(0);
        done();
      },
      (error) => {
        expect(error).toBeDefined();
        done();
      }
    );
  });

  it('Get data from show cast info API', (done: DoneFn) => {
    service.getCastInfo('169').subscribe(
      (value) => {
        expect(value.length).toBeGreaterThan(0);
        done();
      },
      (error) => {
        expect(error).toBeDefined();
        done();
      }
    );
  });
});
