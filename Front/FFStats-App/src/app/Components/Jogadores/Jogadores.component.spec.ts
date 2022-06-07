/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JogadoresComponent } from './Jogadores.component';

describe('JogadoresComponent', () => {
  let component: JogadoresComponent;
  let fixture: ComponentFixture<JogadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JogadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JogadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
