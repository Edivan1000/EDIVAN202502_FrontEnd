import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Orcamento } from '../../model/orcamento';
import { OrcamentoService } from '../../service/orcamento.service';
import { ClienteService } from '../../service/cliente.service';
import { CertificadoDigitalService } from '../../service/certificadodigital.service';
import { Cliente } from '../../model/cliente';
import { CertificadoDigital } from '../../model/certificadodigital';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orcamento',
  templateUrl: './orcamento.component.html',
  standalone: true, // se estiver usando standalone
  imports: [CommonModule, ReactiveFormsModule], // ⬅️ ESSENCIAL
  styleUrls: ['./orcamento.component.css']
})
export class OrcamentoComponent implements OnInit {

  orcamentos: Orcamento[] = [];
  clientes: Cliente[] = [];
  certificados: CertificadoDigital[] = [];
  formOrcamento: FormGroup;
  editando: boolean = false;
  idEdicao: number | null = null;

  constructor(
    private fb: FormBuilder,
    private orcamentoService: OrcamentoService,
    private clienteService: ClienteService,
    private certificadoService: CertificadoDigitalService
  ) {
    this.formOrcamento = this.fb.group({
      dataSolicitacao: ['', Validators.required],
      valorTotal: [0, [Validators.required, Validators.min(0)]],
      clienteId: [null, Validators.required],
      certificadosIds: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.listar();
    this.carregarClientes();
    this.carregarCertificados();
  }

  listar(): void {
    this.orcamentoService.listarOrcamentos().subscribe(
      data => this.orcamentos = data,
      err => console.error('Erro ao listar orçamentos', err)
    );
  }

  carregarClientes(): void {
    this.clienteService.listarClientes().subscribe(
      data => this.clientes = data,
      err => console.error('Erro ao carregar clientes', err)
    );
  }

  carregarCertificados(): void {
    this.certificadoService.listarCertificados().subscribe(
      data => this.certificados = data,
      err => console.error('Erro ao carregar certificados', err)
    );
  }

  salvar(): void {
    if (this.formOrcamento.invalid) return;

    const orcamento: Orcamento = this.formOrcamento.value;

    if (this.editando && this.idEdicao !== null) {
      this.orcamentoService.alterarOrcamento(this.idEdicao, orcamento).subscribe(
        () => {
          this.listar();
          this.cancelar();
        },
        err => console.error('Erro ao alterar orçamento', err)
      );
    } else {
      this.orcamentoService.inserirOrcamento(orcamento).subscribe(
        () => {
          this.listar();
          this.formOrcamento.reset({ dataSolicitacao: '', valorTotal: 0, certificadosIds: [] });
        },
        err => console.error('Erro ao inserir orçamento', err)
      );
    }
  }

  editar(orcamento: Orcamento): void {
    this.editando = true;
    this.idEdicao = orcamento.id || null;
    this.formOrcamento.patchValue(orcamento);
  }

  cancelar(): void {
    this.editando = false;
    this.idEdicao = null;
    this.formOrcamento.reset({ dataSolicitacao: '', valorTotal: 0, certificadosIds: [] });
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir este orçamento?')) return;

    this.orcamentoService.excluirOrcamento(id).subscribe(
      () => this.listar(),
      err => console.error('Erro ao excluir orçamento', err)
    );
  }

  consultar(orcamento: Orcamento): void {
    const clienteNome = this.clientes.find(c => c.id === orcamento.clienteId)?.nome || '';
    const certificadosNomes = this.certificados
      .filter(cert => orcamento.certificadosIds.includes(cert.id!))
      .map(cert => cert.nome)
      .join(', ');

    alert(
      `Data Solicitação: ${orcamento.dataSolicitacao}\n` +
      `Valor Total: R$ ${orcamento.valorTotal.toFixed(2)}\n` +
      `Cliente: ${clienteNome}\n` +
      `Certificados: ${certificadosNomes}`
    );
  }

  getNomeCliente(clienteId: number): string {
  const cliente = this.clientes.find(c => c.id === clienteId);
  return cliente ? cliente.nome : '';
}

getNomesCertificados(certificadosIds: number[]): string {
  if (!certificadosIds) return '';
  const nomes = this.certificados
    .filter(c => certificadosIds.includes(c.id!))
    .map(c => c.nome);
  return nomes.join(', ');
}


}
