import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadodigitalInsereComponent } from './certificadodigital-insere.component';

describe('CertificadodigitalInsereComponent', () => {
  let component: CertificadodigitalInsereComponent;
  let fixture: ComponentFixture<CertificadodigitalInsereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CertificadodigitalInsereComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificadodigitalInsereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
