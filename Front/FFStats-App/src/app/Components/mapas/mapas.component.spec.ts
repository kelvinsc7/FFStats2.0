/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MapasComponent } from './mapas.component';

describe('MapasComponent', () => {
  let component: MapasComponent;
  let fixture: ComponentFixture<MapasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
