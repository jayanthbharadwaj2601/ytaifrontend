import { TestBed } from '@angular/core/testing';

import { VideodetailsService } from './videodetails.service';
import { describe, beforeEach, it } from 'node:test';
import { expect, test } from '@jest/globals'
describe('VideodetailsService', () => {
  let service: VideodetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VideodetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
