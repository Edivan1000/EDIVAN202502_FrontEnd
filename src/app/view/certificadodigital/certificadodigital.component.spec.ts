import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadodigitalComponent } from './certificadodigital.component';

describe('CertificadodigitalComponent', () => {
  let component: CertificadodigitalComponent;
  let fixture: ComponentFixture<CertificadodigitalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificadodigitalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadodigitalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
