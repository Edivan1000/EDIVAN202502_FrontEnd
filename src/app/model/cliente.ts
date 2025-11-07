export enum Publico {
  PF = 'PF',
  PJ = 'PJ'
}

export class Cliente {
  id?: number;        // equivalente ao ID do banco
  nome!: string;
  email!: string;
  telefone!: string;
  publico!: Publico;

  constructor(nome?: string, email?: string, telefone?: string, publico?: Publico) {
    if (nome) this.nome = nome;
    if (email) this.email = email;
    if (telefone) this.telefone = telefone;
    if (publico) this.publico = publico;
  }
}
