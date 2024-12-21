import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomethingMissingComponent } from './something-missing.component';

describe('SomethingMissingComponent', () => {
  let component: SomethingMissingComponent;
  let fixture: ComponentFixture<SomethingMissingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SomethingMissingComponent]
    });
    fixture = TestBed.createComponent(SomethingMissingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
