export class Empresa {
  id?: number;
  nome!: string;
  cnpj!: string;

  constructor(nome?: string, cnpj?: string) {
    if (nome) this.nome = nome;
    if (cnpj) this.cnpj = cnpj;
  }
}
