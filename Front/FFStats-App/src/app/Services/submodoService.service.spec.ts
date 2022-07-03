/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SubmodoServiceService } from './submodoService.service';

describe('Service: SubmodoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SubmodoServiceService]
    });
  });

  it('should ...', inject([SubmodoServiceService], (service: SubmodoServiceService) => {
    expect(service).toBeTruthy();
  }));
});
