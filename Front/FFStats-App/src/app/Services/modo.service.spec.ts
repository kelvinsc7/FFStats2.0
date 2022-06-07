/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModoService } from './modo.service';

describe('Service: Modo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModoService]
    });
  });

  it('should ...', inject([ModoService], (service: ModoService) => {
    expect(service).toBeTruthy();
  }));
});
