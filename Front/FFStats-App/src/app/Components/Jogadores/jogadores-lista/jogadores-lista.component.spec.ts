/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JogadoresListaComponent } from './jogadores-lista.component';

describe('JogadoresListaComponent', () => {
  let component: JogadoresListaComponent;
  let fixture: ComponentFixture<JogadoresListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JogadoresListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogadoresListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
