import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Produto } from '../../model/produto';
import { ProdutoService } from '../../service/produto.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
    standalone: true, // se estiver usando standalone
  imports: [CommonModule, ReactiveFormsModule], // ⬅️ ESSENCIAL
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produtos: Produto[] = [];
  formProduto: FormGroup;
  editando: boolean = false;
  idEdicao: number | null = null;

  constructor(private fb: FormBuilder, private service: ProdutoService) {
    this.formProduto = this.fb.group({
      nome: ['', Validators.required],
      descricao: ['', Validators.required],
      precoBase: [0, [Validators.required, Validators.min(0)]],
      ativo: [true, Validators.required]
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listarProdutos().subscribe(
      data => this.produtos = data,
      err => console.error('Erro ao listar produtos', err)
    );
  }

  salvar(): void {
    if (this.formProduto.invalid) return;

    const produto: Produto = this.formProduto.value;

    if (this.editando && this.idEdicao !== null) {
      this.service.alterarProduto(this.idEdicao, produto).subscribe(
        () => {
          this.listar();
          this.cancelar();
        },
        err => console.error('Erro ao alterar produto', err)
      );
    } else {
      this.service.inserirProduto(produto).subscribe(
        () => {
          this.listar();
          this.formProduto.reset({ ativo: true, precoBase: 0 });
        },
        err => console.error('Erro ao inserir produto', err)
      );
    }
  }

  editar(produto: Produto): void {
    this.editando = true;
    this.idEdicao = produto.id || null;
    this.formProduto.patchValue(produto);
  }

  cancelar(): void {
    this.editando = false;
    this.idEdicao = null;
    this.formProduto.reset({ ativo: true, precoBase: 0 });
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir este produto?')) return;

    this.service.excluirProduto(id).subscribe(
      () => this.listar(),
      err => console.error('Erro ao excluir produto', err)
    );
  }

  consultar(produto: Produto): void {
    alert(
      `Nome: ${produto.nome}\n` +
      `Descrição: ${produto.descricao}\n` +
      `Preço Base: R$ ${produto.precoBase.toFixed(2)}\n` +
      `Ativo: ${produto.ativo ? 'Sim' : 'Não'}`
    );
  }

}
