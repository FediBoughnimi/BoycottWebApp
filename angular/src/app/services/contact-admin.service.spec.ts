import { TestBed } from '@angular/core/testing';

import { ContactAdminService } from './contact-admin.service';

describe('ContactAdminService', () => {
  let service: ContactAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
