import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutoOpcao } from '../../model/produto-opcao';
import { ProdutoOpcaoService } from '../../service/produto-opcao.service';
import { ProdutoService } from '../../service/produto.service';
import { OpcaoValidadeService } from '../../service/opcao-validade.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-opcao',
  templateUrl: './produto-opcao.component.html',
    standalone: true, // se estiver usando standalone
  imports: [CommonModule, ReactiveFormsModule], // ⬅️ ESSENCIAL
  styleUrls: ['./produto-opcao.component.css']
})
export class ProdutoOpcaoComponent implements OnInit {

  produtoOpcoes: ProdutoOpcao[] = [];
  produtos: any[] = [];
  opcoesValidade: any[] = [];
  formProdutoOpcao: FormGroup;
  editando: boolean = false;
  idEdicao: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: ProdutoOpcaoService,
    private produtoService: ProdutoService,
    private opcaoValidadeService: OpcaoValidadeService
  ) {
    this.formProdutoOpcao = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      precoAdicional: [0, [Validators.required, Validators.min(0)]],
      ativo: [true, Validators.required],
      produtoId: [null, Validators.required],
      opcaoValidadeId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.listar();
    this.carregarProdutos();
    this.carregarOpcoesValidade();
  }

  listar(): void {
    this.service.listarProdutoOpcoes().subscribe(
      data => this.produtoOpcoes = data,
      err => console.error('Erro ao listar produto opcoes', err)
    );
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(
      data => this.produtos = data,
      err => console.error('Erro ao carregar produtos', err)
    );
  }

  carregarOpcoesValidade(): void {
    this.opcaoValidadeService.listarOpcoesValidade().subscribe(
      data => this.opcoesValidade = data,
      err => console.error('Erro ao carregar opcoes de validade', err)
    );
  }

  salvar(): void {
    if (this.formProdutoOpcao.invalid) return;

    const produtoOpcao: ProdutoOpcao = this.formProdutoOpcao.value;

    if (this.editando && this.idEdicao !== null) {
      this.service.alterarProdutoOpcao(this.idEdicao, produtoOpcao).subscribe(
        () => {
          this.listar();
          this.cancelar();
        },
        err => console.error('Erro ao alterar produto opcao', err)
      );
    } else {
      this.service.inserirProdutoOpcao(produtoOpcao).subscribe(
        () => {
          this.listar();
          this.formProdutoOpcao.reset({ ativo: true, precoAdicional: 0 });
        },
        err => console.error('Erro ao inserir produto opcao', err)
      );
    }
  }

  editar(produtoOpcao: ProdutoOpcao): void {
    this.editando = true;
    this.idEdicao = produtoOpcao.id || null;
    this.formProdutoOpcao.patchValue(produtoOpcao);
  }

  cancelar(): void {
    this.editando = false;
    this.idEdicao = null;
    this.formProdutoOpcao.reset({ ativo: true, precoAdicional: 0 });
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir esta opção de produto?')) return;

    this.service.excluirProdutoOpcao(id).subscribe(
      () => this.listar(),
      err => console.error('Erro ao excluir produto opcao', err)
    );
  }

  consultar(produtoOpcao: ProdutoOpcao): void {
    const produtoNome = this.produtos.find(p => p.id === produtoOpcao.produtoId)?.nome || '';
    const validadeNome = this.opcoesValidade.find(v => v.id === produtoOpcao.opcaoValidadeId)?.nome || '';
    alert(
      `Nome: ${produtoOpcao.nome}\n` +
      `Descrição: ${produtoOpcao.descricao}\n` +
      `Preço Adicional: R$ ${produtoOpcao.precoAdicional.toFixed(2)}\n` +
      `Ativo: ${produtoOpcao.ativo ? 'Sim' : 'Não'}\n` +
      `Produto: ${produtoNome}\n` +
      `Validade: ${validadeNome}`
    );
  }

  getNomeProduto(produtoId: number): string {
  const prod = this.produtos.find(p => p.id === produtoId);
  return prod ? prod.nome : '';
}

getNomeOpcaoValidade(opcaoValidadeId: number): string {
  const op = this.opcoesValidade.find(v => v.id === opcaoValidadeId);
  return op ? op.nome : '';
}


}
