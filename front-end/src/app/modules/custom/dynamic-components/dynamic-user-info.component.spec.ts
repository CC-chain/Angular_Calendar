import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicUserInfoComponent } from './dynamic-user-info.component';

describe('DynamicUserInfoComponent', () => {
  let component: DynamicUserInfoComponent;
  let fixture: ComponentFixture<DynamicUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
