import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { OrcamentoService } from '../../service/orcamento.service';
import { ClienteService } from '../../service/cliente.service';
import { CertificadoDigitalService } from '../../service/certificadodigital.service';
import { ProdutoOpcaoService } from '../../service/produto-opcao.service';
import { Cliente } from '../../model/cliente';
import { CertificadoDigital } from '../../model/certificadodigital';
import { ProdutoOpcao } from '../../model/produto-opcao';
import { Orcamento } from '../../model/orcamento';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orcamento-mestre',
  templateUrl: './orcamento-mestre.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./orcamento-mestre.component.css']
})
export class OrcamentoMestreComponent implements OnInit {

  orcamentoForm: FormGroup;
  clientes: Cliente[] = [];
  certificados: CertificadoDigital[] = [];
  produtosOpcoes: ProdutoOpcao[] = [];
  valorTotal: number = 0;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private certificadoService: CertificadoDigitalService,
    private produtoOpcaoService: ProdutoOpcaoService,
    private orcamentoService: OrcamentoService
  ) {
    this.orcamentoForm = this.fb.group({
      clienteId: [null, Validators.required],
      dataSolicitacao: [new Date().toISOString().split('T')[0], Validators.required],
      certificados: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarCertificados();
    this.carregarProdutosOpcoes(); // carregando produtos para o select
  }

  get certificadosFormArray(): FormArray {
    return this.orcamentoForm.get('certificados') as FormArray;
  }

  // Tipagem para template
  get certificadosFormGroups(): FormGroup[] {
    return this.certificadosFormArray.controls as FormGroup[];
  }

  carregarClientes() {
    this.clienteService.listarClientes().subscribe(
      data => this.clientes = data,
      err => console.error('Erro ao carregar clientes', err)
    );
  }

  carregarCertificados() {
    this.certificadoService.listarCertificados().subscribe(
      data => this.certificados = data,
      err => console.error('Erro ao carregar certificados', err)
    );
  }

  carregarProdutosOpcoes() {
  this.produtoOpcaoService.listarProdutoOpcoes().subscribe(
    (data: ProdutoOpcao[]) => this.produtosOpcoes = data,
    (err: any) => console.error('Erro ao carregar produtos/opções', err)
  );
}


  adicionarCertificado(certificadoId: string | number) {
    const id = Number(certificadoId);
    if (!id) return; // evita adicionar inválido

    const grupo = this.fb.group({
      certificadoId: [id, Validators.required],
      produtoOpcaoId: [null],
      quantidade: [1, [Validators.required, Validators.min(1)]],
      valor: [{ value: 0, disabled: true }]
    });
    this.certificadosFormArray.push(grupo);
  }

  removerCertificado(index: number) {
    this.certificadosFormArray.removeAt(index);
    this.calcularValorTotal();
  }

  produtoSelecionadoChange(index: number, event: Event) {
  const target = event.target as HTMLSelectElement;
  const value = target.value ? Number(target.value) : null;
  if (value === null) return;

  const grupo = this.certificadosFormArray.at(index);
  const produto = this.produtosOpcoes.find(p => p.id === value);
  grupo.get('valor')?.setValue(produto ? produto.precoAdicional : 0);

  this.calcularValorTotal();
}


  calcularValorTotal() {
    let total = 0;
    this.certificadosFormArray.controls.forEach(ctrl => {
      const valor = ctrl.get('valor')?.value || 0;
      const quantidade = ctrl.get('quantidade')?.value || 0;
      total += valor * quantidade;
    });
    this.valorTotal = total;
  }

  salvarOrcamento() {
    if (this.orcamentoForm.invalid) return;

    const formValue = this.orcamentoForm.value;
    const orcamento: Orcamento = {
      clienteId: formValue.clienteId,
      dataSolicitacao: formValue.dataSolicitacao,
      valorTotal: this.valorTotal,
      certificadosIds: formValue.certificados.map((c: any) => c.certificadoId)
    };

    this.orcamentoService.inserirOrcamento(orcamento).subscribe(
      () => alert('Orçamento enviado com sucesso!'),
      err => console.error('Erro ao salvar orçamento', err)
    );
  }

  getNomeCertificado(certificadoId: number): string {
    const cert = this.certificados.find(c => c.id === certificadoId);
    return cert ? cert.nome : '';
  }
}
