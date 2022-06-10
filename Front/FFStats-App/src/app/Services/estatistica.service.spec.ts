/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EstatisticaService } from './estatistica.service';

describe('Service: Estatistica', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstatisticaService]
    });
  });

  it('should ...', inject([EstatisticaService], (service: EstatisticaService) => {
    expect(service).toBeTruthy();
  }));
});
