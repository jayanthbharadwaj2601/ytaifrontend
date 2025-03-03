import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SinglevideoComponent } from './singlevideo.component';
import { describe, beforeEach, it } from 'node:test';
import { expect, test } from '@jest/globals'
describe('SinglevideoComponent', () => {
  let component: SinglevideoComponent;
  let fixture: ComponentFixture<SinglevideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SinglevideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SinglevideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
