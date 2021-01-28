import { TestBed } from '@angular/core/testing';

import { BeHealthCheckService } from './behealthcheck.service';

describe('BeHealthCheckService', () => {
  let service: BeHealthCheckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BeHealthCheckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
