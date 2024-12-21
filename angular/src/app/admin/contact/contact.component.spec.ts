import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAdminComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactAdminComponent;
  let fixture: ComponentFixture<ContactAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactAdminComponent]
    });
    fixture = TestBed.createComponent(ContactAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
