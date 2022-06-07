/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PartidaService } from './partida.service';

describe('Service: Partida', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PartidaService]
    });
  });

  it('should ...', inject([PartidaService], (service: PartidaService) => {
    expect(service).toBeTruthy();
  }));
});
