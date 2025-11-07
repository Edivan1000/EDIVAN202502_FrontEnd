export class CertificadoDigital {
  id!: number;
  nome!: string;             // corresponde ao back
  ativo!: boolean;
  produtoOpcaoId?: number;   // corresponde a produto_opcao_id
  orcamentoId?: number;      // corresponde a orcamento_id
}
