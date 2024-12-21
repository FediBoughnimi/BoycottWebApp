import { TestBed } from '@angular/core/testing';

import { KeyclockService } from './keyclock.service';

describe('KeyclockService', () => {
  let service: KeyclockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeyclockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
