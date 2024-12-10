/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LevelAddComponent } from './level-add.component';

describe('LevelAddComponent', () => {
  let component: LevelAddComponent;
  let fixture: ComponentFixture<LevelAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevelAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
