import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente, Publico } from '../../model/cliente';
import { ClienteService } from '../../service/cliente.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  standalone: true, // se estiver usando standalone
  imports: [CommonModule, ReactiveFormsModule], // ⬅️ ESSENCIAL
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  clientes: Cliente[] = [];
  formCliente: FormGroup;
  editando: boolean = false;
  idEdicao: number | null = null;
  publicos = Object.values(Publico); // garante que o enum apareça no HTML

  constructor(
    private fb: FormBuilder,
    private service: ClienteService
  ) {
    this.formCliente = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      publico: [Publico.PF, Validators.required] // valor default PF
    });
  }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listarClientes().subscribe(
      data => this.clientes = data,
      err => console.error('Erro ao listar clientes', err)
    );
  }

  salvar(): void {
    if (this.formCliente.invalid) return;

    const cliente: Cliente = this.formCliente.value;

    if (this.editando && this.idEdicao !== null) {
      this.service.alterarCliente(this.idEdicao, cliente).subscribe(
        () => {
          this.listar();
          this.cancelar();
        },
        err => console.error('Erro ao alterar cliente', err)
      );
    } else {
      this.service.inserirCliente(cliente).subscribe(
        () => {
          this.listar();
          this.formCliente.reset({ publico: Publico.PF });
        },
        err => console.error('Erro ao inserir cliente', err)
      );
    }
  }

  editar(cliente: Cliente): void {
    this.editando = true;
    this.idEdicao = cliente.id || null;
    this.formCliente.patchValue(cliente);
  }

  cancelar(): void {
    this.editando = false;
    this.idEdicao = null;
    this.formCliente.reset({ publico: Publico.PF });
  }

  excluir(id: number): void {
    if (!confirm('Deseja realmente excluir este cliente?')) return;

    this.service.excluirCliente(id).subscribe(
      () => this.listar(),
      err => console.error('Erro ao excluir cliente', err)
    );
  }

  consultar(cliente: Cliente): void {
    alert(
      `Nome: ${cliente.nome}\n` +
      `Email: ${cliente.email}\n` +
      `Telefone: ${cliente.telefone}\n` +
      `Tipo: ${cliente.publico}`
    );
  }
}
