import { TestBed } from '@angular/core/testing';

import { MesurementService } from './mesurement.service';

describe('MesurementService', () => {
  let service: MesurementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesurementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
