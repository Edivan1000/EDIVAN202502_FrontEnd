import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CertificadoDigital } from '../../model/certificadodigital';
import { CertificadoDigitalService } from '../../service/certificadodigital.service';

@Component({
  selector: 'app-certificadodigital-insere',
  standalone: false,
  templateUrl: './certificadodigital-insere.component.html',
  styleUrl: './certificadodigital-insere.component.css'
})
export class CertificadodigitalInsereComponent {

  // Modelo que recebe os dados do formulário
  certificadoDigital: CertificadoDigital = new CertificadoDigital();

  constructor(private certificadoDigitalService: CertificadoDigitalService, private router: Router) {}

  onSubmit() {
    this.inserirCertificadoDigital();
  }
  // Chama o serviço para salvar o certificado
  inserirCertificadoDigital() {
  const novoCertificado = {
    nomeProduto: this.certificadoDigital.nomeProduto,
    tipoPublico: this.certificadoDigital.tipoPublico,
    dataValidade: this.certificadoDigital.validade,
    preco: this.certificadoDigital.preco,
    ativo: this.certificadoDigital.ativo,
    validadeMeses: this.certificadoDigital.validadeMeses
    // sem id!
  };

  this.certificadoDigitalService.inserirCertificadoDigital(this.certificadoDigital).subscribe(data => {
    console.log(data);
    this.retornar();
  });
}

  // Volta para a tela de listagem
  retornar() {
    this.router.navigate(['certificadodigital-lista']);
  }
}