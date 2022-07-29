import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicProfileComponent } from './dynamic-profile.component';

describe('DynamicProfileComponent', () => {
  let component: DynamicProfileComponent;
  let fixture: ComponentFixture<DynamicProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
