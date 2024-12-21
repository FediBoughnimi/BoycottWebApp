import { TestBed } from '@angular/core/testing';

import { SomethingMissingService } from './something-missing.service';

describe('SomethingMissingService', () => {
  let service: SomethingMissingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SomethingMissingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
