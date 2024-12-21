import { TestBed } from '@angular/core/testing';

import { ImageProductService } from './image-product.service';

describe('ImageProductService', () => {
  let service: ImageProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
