import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrcamentoMestreComponent } from './orcamento-mestre.component';

describe('OrcamentoMestreComponent', () => {
  let component: OrcamentoMestreComponent;
  let fixture: ComponentFixture<OrcamentoMestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrcamentoMestreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrcamentoMestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
