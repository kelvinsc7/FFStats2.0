/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CallListasComponent } from './call-listas.component';

describe('CallListasComponent', () => {
  let component: CallListasComponent;
  let fixture: ComponentFixture<CallListasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CallListasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CallListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
