import { TestBed, inject } from '@angular/core/testing';

import { DestinationServiceService } from './destination-service.service';

describe('DestinationServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DestinationServiceService]
    });
  });

  it('should be created', inject([DestinationServiceService], (service: DestinationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
