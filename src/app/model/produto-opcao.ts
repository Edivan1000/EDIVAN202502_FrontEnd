export class ProdutoOpcao {
  id?: number;
  nome!: string;
  descricao!: string;
  precoAdicional!: number;
  ativo!: boolean;
  produtoId!: number;        // FK para Produto
  opcaoValidadeId!: number;  // FK para OpcaoValidade

  constructor(
    nome?: string,
    descricao?: string,
    precoAdicional?: number,
    ativo?: boolean,
    produtoId?: number,
    opcaoValidadeId?: number
  ) {
    if (nome) this.nome = nome;
    if (descricao) this.descricao = descricao;
    if (precoAdicional !== undefined) this.precoAdicional = precoAdicional;
    if (ativo !== undefined) this.ativo = ativo;
    if (produtoId !== undefined) this.produtoId = produtoId;
    if (opcaoValidadeId !== undefined) this.opcaoValidadeId = opcaoValidadeId;
  }
}
