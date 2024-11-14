/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ConfiguracaoService } from './configuracao.service';

describe('Service: Configuracao', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfiguracaoService]
    });
  });

  it('should ...', inject([ConfiguracaoService], (service: ConfiguracaoService) => {
    expect(service).toBeTruthy();
  }));
});
