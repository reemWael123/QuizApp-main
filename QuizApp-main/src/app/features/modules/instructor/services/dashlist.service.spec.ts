import { TestBed } from '@angular/core/testing';

import { DashlistService } from './dashlist.service';

describe('DashlistService', () => {
  let service: DashlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
