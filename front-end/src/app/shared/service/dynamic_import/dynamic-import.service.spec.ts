import { TestBed } from '@angular/core/testing';

import { DynamicImportService } from './dynamic-import.service';

describe('DynamicImportService', () => {
  let service: DynamicImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
