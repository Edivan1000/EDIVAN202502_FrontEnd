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

  codigo!: number;
  certificadoDigital!: CertificadoDigital;

  constructor(
    private certificadoDigitalService: CertificadoDigitalService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.consultarCertificadoDigital();
  }

  onSubmit() {
    this.certificadoDigitalService.alterarCertificadoDigital(this.codigo, this.certificadoDigital).subscribe(data => {
      console.log(data);
      this.retornar();
    });
  }

  consultarCertificadoDigital() {
    this.codigo = this.route.snapshot.params['codigo'];
    this.certificadoDigital = new CertificadoDigital();
    this.certificadoDigitalService.consultarCertificadoDigital(this.codigo).subscribe(data => {
      this.certificadoDigital = data;
    });
  }

  retornar() {
    this.router.navigate(['certificadodigital-lista']);
  }
}