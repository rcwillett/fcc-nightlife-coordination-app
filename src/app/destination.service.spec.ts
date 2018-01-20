import { TestBed, inject } from '@angular/core/testing';

import { DestinationService } from './destination.service';

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
