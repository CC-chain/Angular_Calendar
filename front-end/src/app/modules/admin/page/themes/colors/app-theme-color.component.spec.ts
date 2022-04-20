import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppThemeColorComponent } from './app-theme-color.component';

describe('AppThemeColorComponent', () => {
  let component: AppThemeColorComponent;
  let fixture: ComponentFixture<AppThemeColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppThemeColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppThemeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
