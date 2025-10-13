// Modelo de dados do certificado digital
export class CertificadoDigital {
  id!: number;               // Identificador único
  nomeProduto!: string;      // Nome do certificado
  tipoPublico!: string;      // Público-alvo (ex: pessoa física, jurídica)
  validade!: Date;           // Data de validade do produto
  preco!: number;            // Valor do certificado
  ativo!: boolean;           // Status ativo/inativo
  validadeMeses!: number;    // Duração em meses
}