export class CertificadoDigital {
  codigo!: number;            // mesmo que id
  nome!: string;              // nomeProduto
  publicoAlvo!: string;       // tipoPublico
  validade!: Date;            // dataValidade
  precoVenda!: number;        // preco
  ativo!: boolean;            // ativo
  mesesValidade!: number;     // validadeMeses
}