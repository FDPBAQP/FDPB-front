import { TestBed } from '@angular/core/testing';

import { DirigenteService } from './dirigente.service';

describe('DirigenteService', () => {
  let service: DirigenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirigenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
