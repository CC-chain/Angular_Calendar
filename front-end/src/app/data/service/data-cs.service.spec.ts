import { TestBed } from '@angular/core/testing';

import { DataCsService } from './data-cs.service';

describe('DataCsService', () => {
  let service: DataCsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataCsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
