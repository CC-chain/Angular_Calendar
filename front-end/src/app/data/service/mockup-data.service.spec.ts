import { TestBed } from '@angular/core/testing';

import { MockupDataService } from './mockup-data.service';

describe('MockupDataService', () => {
  let service: MockupDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockupDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
