export class Orcamento {
  id?: number;
  dataSolicitacao!: string;    // 'yyyy-MM-dd'
  valorTotal!: number;
  clienteId!: number;          // FK para Cliente
  certificadosIds!: number[];  // array de FK para CertificadoDigital

  constructor(
    dataSolicitacao?: string,
    valorTotal?: number,
    clienteId?: number,
    certificadosIds?: number[]
  ) {
    if (dataSolicitacao) this.dataSolicitacao = dataSolicitacao;
    if (valorTotal !== undefined) this.valorTotal = valorTotal;
    if (clienteId !== undefined) this.clienteId = clienteId;
    if (certificadosIds) this.certificadosIds = certificadosIds;
  }
}
