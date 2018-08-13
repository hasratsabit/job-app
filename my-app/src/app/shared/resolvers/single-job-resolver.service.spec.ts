import { TestBed, inject } from '@angular/core/testing';

import { SingleJobResolverService } from './single-job-resolver.service';

describe('SingleJobResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SingleJobResolverService]
    });
  });

  it('should be created', inject([SingleJobResolverService], (service: SingleJobResolverService) => {
    expect(service).toBeTruthy();
  }));
});
