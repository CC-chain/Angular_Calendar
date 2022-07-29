import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicLogoutButtonComponent } from './dynamic-logout-button.component';

describe('DynamicLogoutButtonComponent', () => {
  let component: DynamicLogoutButtonComponent;
  let fixture: ComponentFixture<DynamicLogoutButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicLogoutButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicLogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
