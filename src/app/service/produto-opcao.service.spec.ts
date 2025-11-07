import { TestBed } from '@angular/core/testing';

import { ProdutoOpcaoService } from './produto-opcao.service';

describe('ProdutoOpcaoService', () => {
  let service: ProdutoOpcaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoOpcaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
