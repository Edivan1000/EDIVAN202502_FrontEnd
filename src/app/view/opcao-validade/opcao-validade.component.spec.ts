import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpcaoValidadeComponent } from './opcao-validade.component';

describe('OpcaoValidadeComponent', () => {
  let component: OpcaoValidadeComponent;
  let fixture: ComponentFixture<OpcaoValidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OpcaoValidadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpcaoValidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
