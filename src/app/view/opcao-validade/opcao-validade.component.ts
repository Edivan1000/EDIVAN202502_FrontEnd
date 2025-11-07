import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OpcaoValidade } from '../../model/opcao-validade';
import { OpcaoValidadeService } from '../../service/opcao-validade.service';
import { CertificadoDigitalService } from '../../service/certificadodigital.service';
import { CertificadoDigital } from '../../model/certificadodigital';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-opcao-validade',
  templateUrl: './opcao-validade.component.html',
    standalone: true, // se estiver usando standalone
  imports: [CommonModule, ReactiveFormsModule], // ⬅️ ESSENCIAL
  styleUrls: ['./opcao-validade.component.css']
})
export class OpcaoValidadeComponent implements OnInit {

  opcoesValidade: OpcaoValidade[] = [];
  certificados: CertificadoDigital[] = [];
  formOpcaoValidade: FormGroup;
  editando: boolean = false;
  idEdicao: number | null = null;

  tiposPublico = ['PF', 'PJ'];

  constructor(
    private fb: FormBuilder,
    private service: OpcaoValidadeService,
    private certificadoService: CertificadoDigitalService
  ) {
    this.formOpcaoValidade = this.fb.group({
      validadeMeses: [12, [Validators.required, Validators.min(1)]],
      preco: [0, [Validators.required, Validators.min(0)]],
      tipoPublico: ['PF', Validators.required],
      certificadoId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.listar();
    this.carregarCertificados();
  }

  listar(): void {
    this.service.listarOpcoesValidade().subscribe(
      data => this.opcoesValidade = data,
      err => console.error('Erro ao listar opções de validade', err)
    );
  }

  carregarCertificados(): void {
    this.certificadoService.listarCertificados().subscribe(
      data => this.certificados = data,
      err => console.error('Erro ao carregar certificados', err)
    );
  }

  salvar(): void {
    if (this.formOpcaoValidade.invalid) return;

    const opcao: OpcaoValidade = this.formOpcaoValidade.value;

    if (this.editando && this.idEdicao !== null) {
      this.service.alterarOpcaoValidade(this.idEdicao, opcao).subscribe(
        () => {
          this.listar();
          this.cancelar();
        },
        err => console.error('Erro ao alterar opção de validade', err)
      );
    } else {
      this.service.inserirOpcaoValidade(opcao).subscribe(
        () => {
          this.listar();
          this.formOpcaoValidade.reset({ validadeMeses: 12, preco: 0, tipoPublico: 'PF' });
        },
        err => console.error('Erro ao inserir opção de validade', err)
      );
    }
  }

  editar(opcao: OpcaoValidade): void {
    this.editando = true;
    this.idEdicao = opcao.id || null;
    this.formOpcaoValidade.patchValue(opcao);
  }

  cancelar(): void {
    this.editando = false;
    this.idEdicao = null;
    this.formOpcaoValidade.reset({ validadeMeses: 12, preco: 0, tipoPublico: 'PF' });
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir esta opção de validade?')) return;

    this.service.excluirOpcaoValidade(id).subscribe(
      () => this.listar(),
      err => console.error('Erro ao excluir opção de validade', err)
    );
  }

  consultar(opcao: OpcaoValidade): void {
    const certificadoNome = this.certificados.find(c => c.id === opcao.certificadoId)?.nome || '';
    alert(
      `Validade (meses): ${opcao.validadeMeses}\n` +
      `Preço: R$ ${opcao.preco.toFixed(2)}\n` +
      `Tipo Público: ${opcao.tipoPublico}\n` +
      `Certificado: ${certificadoNome}`
    );
  }

  getNomeCertificado(certificadoId: number): string {
  const cert = this.certificados.find(c => c.id === certificadoId);
  return cert ? cert.nome : '';
}


}
