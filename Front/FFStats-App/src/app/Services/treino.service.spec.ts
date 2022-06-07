/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TreinoService } from './treino.service';

describe('Service: Treino', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreinoService]
    });
  });

  it('should ...', inject([TreinoService], (service: TreinoService) => {
    expect(service).toBeTruthy();
  }));
});
