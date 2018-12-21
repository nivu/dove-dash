import { TestBed, inject } from '@angular/core/testing';

import { BmmRestService } from './bmm-rest.service';

describe('BmmRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BmmRestService]
    });
  });

  it('should be created', inject([BmmRestService], (service: BmmRestService) => {
    expect(service).toBeTruthy();
  }));
});
