import { TestBed } from '@angular/core/testing';

import { ApartmentsService } from 'src/app/core/Services/apartments.service';

describe('ApartmentsService', () => {
  let service: ApartmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApartmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
