import { TestBed } from '@angular/core/testing';

import { MazeFlixService } from './maze-flix.service';

describe('MazeFlixService', () => {
  let service: MazeFlixService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MazeFlixService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
