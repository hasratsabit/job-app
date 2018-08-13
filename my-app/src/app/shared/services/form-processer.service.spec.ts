import { TestBed, inject } from '@angular/core/testing';

import { FormProcesserService } from './form-processer.service';

describe('FormProcesserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormProcesserService]
    });
  });

  it('should be created', inject([FormProcesserService], (service: FormProcesserService) => {
    expect(service).toBeTruthy();
  }));
});
