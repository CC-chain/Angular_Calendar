import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventsEditComponent } from './calendar-events-edit.component';

describe('CalendarEventsEditComponent', () => {
  let component: CalendarEventsEditComponent;
  let fixture: ComponentFixture<CalendarEventsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventsEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
