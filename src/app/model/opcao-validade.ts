export class OpcaoValidade {
  id?: number;
  validadeMeses!: number;
  preco!: number;
  tipoPublico!: string;       // 'PF' ou 'PJ'
  certificadoId!: number;     // FK para CertificadoDigital

  constructor(
    validadeMeses?: number,
    preco?: number,
    tipoPublico?: string,
    certificadoId?: number
  ) {
    if (validadeMeses !== undefined) this.validadeMeses = validadeMeses;
    if (preco !== undefined) this.preco = preco;
    if (tipoPublico) this.tipoPublico = tipoPublico;
    if (certificadoId !== undefined) this.certificadoId = certificadoId;
  }
}
