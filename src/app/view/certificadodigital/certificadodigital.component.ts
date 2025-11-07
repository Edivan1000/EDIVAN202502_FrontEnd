import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CertificadoDigital } from '../../model/certificadodigital';
import { CertificadoDigitalService } from '../../service/certificadodigital.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificadodigital',
  standalone: true, // se estiver usando standalone
  imports: [CommonModule, ReactiveFormsModule], // ⬅️ ESSENCIAL
  templateUrl: './certificadodigital.component.html',
  styleUrls: ['./certificadodigital.component.css']
})
export class CertificadoDigitalComponent implements OnInit {

  certificados: CertificadoDigital[] = [];
  formCertificado: FormGroup;
  editando: boolean = false;
  idEdicao: number | null = null;

  constructor(
    private fb: FormBuilder,
    private service: CertificadoDigitalService
  ) {
    this.formCertificado = this.fb.group({
      nome: ['', Validators.required],
      ativo: [true],
      produtoOpcaoId: [null],
      orcamentoId: [null]
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listarCertificados().subscribe(
      data => this.certificados = data,
      err => console.error('Erro ao listar certificados', err)
    );
  }

  salvar(): void {
    if (this.formCertificado.invalid) return;

    const certificado: CertificadoDigital = this.formCertificado.value;

    if (this.editando && this.idEdicao !== null) {
      this.service.alterar(this.idEdicao, certificado).subscribe(
        () => {
          this.listar();
          this.cancelar();
        },
        err => console.error('Erro ao alterar certificado', err)
      );
    } else {
      this.service.inserir(certificado).subscribe(
        () => {
          this.listar();
          this.formCertificado.reset({ ativo: true });
        },
        err => console.error('Erro ao inserir certificado', err)
      );
    }
  }

  editar(certificado: CertificadoDigital): void {
    this.editando = true;
    this.idEdicao = certificado.id;
    this.formCertificado.patchValue(certificado);
  }

  cancelar(): void {
    this.editando = false;
    this.idEdicao = null;
    this.formCertificado.reset({ ativo: true });
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir este certificado?')) return;

    this.service.excluir(id).subscribe(
      () => this.listar(),
      err => console.error('Erro ao excluir certificado', err)
    );
  }

  consultar(certificado: CertificadoDigital): void {
    alert(
      `Nome: ${certificado.nome}\n` +
      `Ativo: ${certificado.ativo}\n` +
      `Produto Opção ID: ${certificado.produtoOpcaoId}\n` +
      `Orçamento ID: ${certificado.orcamentoId}`
    );
  }

}
