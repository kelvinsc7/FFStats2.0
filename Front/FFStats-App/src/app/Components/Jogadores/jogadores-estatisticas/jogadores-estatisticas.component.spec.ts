/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JogadoresEstatisticasComponent } from './jogadores-estatisticas.component';

describe('JogadoresEstatisticasComponent', () => {
  let component: JogadoresEstatisticasComponent;
  let fixture: ComponentFixture<JogadoresEstatisticasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JogadoresEstatisticasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogadoresEstatisticasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
