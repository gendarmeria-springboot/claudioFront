import { TestBed } from '@angular/core/testing';

import { InternoService } from './interno.service';

describe('InternoService', () => {
  let service: InternoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InternoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
