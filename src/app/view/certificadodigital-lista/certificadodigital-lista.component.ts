import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CertificadoDigital } from '../../model/certificadodigital';
import { CertificadoDigitalService } from '../../service/certificadodigital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-certificadodigital-lista',
  standalone: false,
  templateUrl: './certificadodigital-lista.component.html',
  styleUrl: './certificadodigital-lista.component.css'
})
export class CertificadodigitalListaComponent implements OnInit {

  certificados!: CertificadoDigital[];

  constructor(private certService: CertificadoDigitalService, private router: Router) {}

  ngOnInit(): void {
    this.listarCertificados();
  }

  private listarCertificados() {
  this.certService.listarCertificados().subscribe(data => {
    console.log('Certificados recebidos:', data); // ← VERIFICA SE VEM ALGO
    this.certificados = data;
  });
}

formatarData(data: Date): string {
    const d = new Date(data);
    const dia = String(d.getDate()).padStart(2, '0');
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const ano = d.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
  formatarPreco(valor: number | undefined): string {
  return valor ? valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : '—';
}

consultaCertificadodigital(codigo: number){
  this.router.navigate(['certificadodigital-consulta', codigo]);
}  


alterarCertificadodigital(codigo: number){
  this.router.navigate(['certificadodigital-altera', codigo]);
}

inserirCertificadodigital(){
  this.router.navigate(['certificadodigital-insere']);
}

excluirCertificadodigital(codigo: number) {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Essa ação excluirá o certificado digital.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6'
  }).then((result) => {
    if (result.isConfirmed) {
      this.certService.excluirCertificadoDigital(codigo).subscribe(data => {
        console.log(data);
        this.listarCertificados();
        Swal.fire('Excluído!', 'O certificado foi removido com sucesso.', 'success');
      });
    }
  });
}






  

}