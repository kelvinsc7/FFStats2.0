/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EstatisticasVisualizarComponent } from './estatisticas-visualizar.component';

describe('EstatisticasVisualizarComponent', () => {
  let component: EstatisticasVisualizarComponent;
  let fixture: ComponentFixture<EstatisticasVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstatisticasVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstatisticasVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
