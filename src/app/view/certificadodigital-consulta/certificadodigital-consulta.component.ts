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

  // Armazena o certificado consultado
  certificadodigital!: CertificadoDigital;

  // Código usado na busca
  codigo!: number;

  constructor(
  private certificadoDigitalService: CertificadoDigitalService,
  private router: Router,
  private route: ActivatedRoute
) {}

  // Executa ao carregar o componente
  ngOnInit(): void {
      this.consultarCertificadoDigital();
   
  }

// Volta para a tela de listagem
 retornar(){
  this.router.navigate(['certificadodigital-lista']);
 }

 // Consulta o certificado pelo código
 consultarCertificadoDigital() {
  this.codigo = this.route.snapshot.params['codigo'];
  this.certificadodigital = new CertificadoDigital();

  this.certificadoDigitalService.consultarCertificadoDigital(this.codigo).subscribe(data => {
    console.log('Certificado recebido:', data);
    this.certificadodigital = data;

    // Converte a data se vier como string
    if (typeof this.certificadodigital.validade === 'string') {
      this.certificadodigital.validade = new Date(this.certificadodigital.validade);
    }
  });
}


}
