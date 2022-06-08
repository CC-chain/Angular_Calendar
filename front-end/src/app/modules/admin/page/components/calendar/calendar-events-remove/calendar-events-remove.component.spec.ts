import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarEventsRemoveComponent } from './calendar-events-remove.component';

describe('CalendarEventsRemoveComponent', () => {
  let component: CalendarEventsRemoveComponent;
  let fixture: ComponentFixture<CalendarEventsRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarEventsRemoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarEventsRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
