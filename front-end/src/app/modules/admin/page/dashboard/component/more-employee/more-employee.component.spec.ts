import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreEmployeeComponent } from './more-employee.component';

describe('MoreEmployeeComponent', () => {
  let component: MoreEmployeeComponent;
  let fixture: ComponentFixture<MoreEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoreEmployeeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
