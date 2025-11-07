export class Produto {
  id?: number;
  nome!: string;
  descricao!: string;
  precoBase!: number;
  ativo!: boolean;

  constructor(nome?: string, descricao?: string, precoBase?: number, ativo?: boolean) {
    if (nome) this.nome = nome;
    if (descricao) this.descricao = descricao;
    if (precoBase !== undefined) this.precoBase = precoBase;
    if (ativo !== undefined) this.ativo = ativo;
  }
}
