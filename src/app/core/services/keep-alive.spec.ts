import { TestBed } from '@angular/core/testing';

import { KeepAlive } from './keep-alive';

describe('KeepAlive', () => {
  let service: KeepAlive;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KeepAlive);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
