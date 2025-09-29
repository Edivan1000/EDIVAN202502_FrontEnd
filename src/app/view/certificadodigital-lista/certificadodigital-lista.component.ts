import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CertificadoDigital } from '../../model/certificadodigital';
import { CertificadoDigitalService } from '../../service/certificadodigital.service';

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
      this.certificados = data;
    });
  }

}