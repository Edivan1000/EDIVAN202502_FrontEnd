import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CertificadoDigital } from '../../model/certificadodigital';
import { CertificadoDigitalService } from '../../service/certificadodigital.service';

@Component({
  selector: 'app-certificadodigital-consulta',
  standalone: false,
  templateUrl: './certificadodigital-consulta.component.html',
  styleUrl: './certificadodigital-consulta.component.css'
})
export class CertificadoDigitalConsultaComponent {

certificadodigital!: CertificadoDigital;
codigo!: number;

  constructor(
  private certificadoDigitalService: CertificadoDigitalService,
  private router: Router,
  private route: ActivatedRoute
) {}


  ngOnInit(): void {
      this.consultarCertificadoDigital();
   
  }

 retornar(){
  this.router.navigate(['certificadodigital-lista']);
 }

 consultarCertificadoDigital(){
  this.codigo = this.route.snapshot.params['codigo'];
  this.certificadodigital = new CertificadoDigital();
  this.certificadoDigitalService.consultarCertificadoDigital(this.codigo).subscribe(data =>{
    this.certificadodigital = data
  });
 }


}
