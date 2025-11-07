import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoOpcaoComponent } from './produto-opcao.component';

describe('ProdutoOpcaoComponent', () => {
  let component: ProdutoOpcaoComponent;
  let fixture: ComponentFixture<ProdutoOpcaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProdutoOpcaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProdutoOpcaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
