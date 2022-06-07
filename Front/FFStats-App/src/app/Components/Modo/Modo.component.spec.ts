/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModoComponent } from './Modo.component';

describe('ModoComponent', () => {
  let component: ModoComponent;
  let fixture: ComponentFixture<ModoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
