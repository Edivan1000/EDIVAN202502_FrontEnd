import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empresa } from '../../model/empresa';
import { EmpresaService } from '../../service/empresa.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
    standalone: true, // se estiver usando standalone
  imports: [CommonModule, ReactiveFormsModule], // ⬅️ ESSENCIAL
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent implements OnInit {

  empresas: Empresa[] = [];
  formEmpresa: FormGroup;
  editando: boolean = false;
  idEdicao: number | null = null;

  constructor(private fb: FormBuilder, private service: EmpresaService) {
    this.formEmpresa = this.fb.group({
      nome: ['', Validators.required],
      cnpj: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  /** Lista todas as empresas */
  listar(): void {
    this.service.listarEmpresas().subscribe(
      data => this.empresas = data,
      err => console.error('Erro ao listar empresas', err)
    );
  }

  /** Salva ou atualiza uma empresa */
  salvar(): void {
    if (this.formEmpresa.invalid) return;

    const empresa: Empresa = this.formEmpresa.value;

    if (this.editando && this.idEdicao !== null) {
      this.service.alterarEmpresa(this.idEdicao, empresa).subscribe(
        () => {
          this.listar();
          this.cancelar();
        },
        err => console.error('Erro ao alterar empresa', err)
      );
    } else {
      this.service.inserirEmpresa(empresa).subscribe(
        () => {
          this.listar();
          this.formEmpresa.reset();
        },
        err => console.error('Erro ao inserir empresa', err)
      );
    }
  }

  /** Prepara o formulário para edição */
  editar(empresa: Empresa): void {
    this.editando = true;
    this.idEdicao = empresa.id || null;
    this.formEmpresa.patchValue(empresa);
  }

  /** Cancela a edição */
  cancelar(): void {
    this.editando = false;
    this.idEdicao = null;
    this.formEmpresa.reset();
  }

  /** Exclui uma empresa */
  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir esta empresa?')) return;

    this.service.excluirEmpresa(id).subscribe(
      () => this.listar(),
      err => console.error('Erro ao excluir empresa', err)
    );
  }

  /** Consulta detalhes da empresa */
  consultar(empresa: Empresa): void {
    alert(
      `Nome: ${empresa.nome}\n` +
      `CNPJ: ${empresa.cnpj}`
    );
  }

}
