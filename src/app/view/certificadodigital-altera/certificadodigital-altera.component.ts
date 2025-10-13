import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificadoDigital } from '../../model/certificadodigital';
import { CertificadoDigitalService } from '../../service/certificadodigital.service';

@Component({
  selector: 'app-certificadodigital-altera',
  standalone: false,
  templateUrl: './certificadodigital-altera.component.html',
  styleUrl: './certificadodigital-altera.component.css'
})
export class CertificadodigitalAlteraComponent implements OnInit {

  // Código do certificado a ser alterado
  codigo!: number;

  // Dados do certificado
  certificadoDigital!: CertificadoDigital;

  constructor(
    private certificadoDigitalService: CertificadoDigitalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Ao iniciar, carrega os dados do certificado
  ngOnInit(): void {
    this.consultarCertificadoDigital();
  }

  // Envia os dados atualizados
  onSubmit() {
    this.certificadoDigitalService.alterarCertificadoDigital(this.codigo, this.certificadoDigital).subscribe(data => {
      console.log(data);
      this.retornar();
    });
  }

  // Consulta os dados atuais do certificado
  consultarCertificadoDigital() {
    this.codigo = this.route.snapshot.params['codigo'];
    this.certificadoDigital = new CertificadoDigital();
    this.certificadoDigitalService.consultarCertificadoDigital(this.codigo).subscribe(data => {
      this.certificadoDigital = data;
    });
  }

  // Volta para a tela de listagem
  retornar() {
    this.router.navigate(['certificadodigital-lista']);
  }
}