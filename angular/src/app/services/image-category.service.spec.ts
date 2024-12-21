import { TestBed } from '@angular/core/testing';

import { ImageCategoryService } from './image-category.service';

describe('ImageCategoryService', () => {
  let service: ImageCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
