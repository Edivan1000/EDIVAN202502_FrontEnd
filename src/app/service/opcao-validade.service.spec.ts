import { TestBed } from '@angular/core/testing';

import { OpcaoValidadeService } from './opcao-validade.service';

describe('OpcaoValidadeService', () => {
  let service: OpcaoValidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpcaoValidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
