import { TestBed } from '@angular/core/testing';

import { CertificadoDigitalService } from './certificadodigital';

describe('CertificadoDigital', () => {
  let service: CertificadoDigitalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificadoDigitalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});