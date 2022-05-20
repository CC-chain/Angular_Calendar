import { TestBed } from '@angular/core/testing';

import { AsyncEventsService } from './async-events.service';

describe('AsyncEventsService', () => {
  let service: AsyncEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AsyncEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
