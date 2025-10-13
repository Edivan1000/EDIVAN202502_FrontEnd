import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CertificadoDigital } from '../model/certificadodigital';

@Injectable({
  providedIn: 'root'
})
export class CertificadoDigitalService {

  // URL base da API
  private url = "http://localhost:8080/ccertificadodigital/certificadodigital";
 
  constructor(private httpClient: HttpClient) { }

  //Métodos que consomem os serviços HTTP do backend

  // Lista todos os certificados
  listarCertificados(): Observable<CertificadoDigital[]> {
    console.log('Chamando backend...');
    return this.httpClient.get<CertificadoDigital[]>(`${this.url}`);
  }

  // Insere um novo certificado
  inserirCertificadoDigital(certificadodigital: CertificadoDigital): Observable<object>{
    return this.httpClient.post(`${this.url}`, certificadodigital);
  }

  // Altera um certificado existente
  alterarCertificadoDigital(codigo: number, certificadodigital: CertificadoDigital): Observable<object>{
    return this.httpClient.put(`${this.url}/${codigo}`, certificadodigital);
  }
  
  // Exclui um certificado
  excluirCertificadoDigital(codigo: number): Observable<object>{
    return this.httpClient.delete(`${this.url}/${codigo}`);
  }

  // Consulta um certificado pelo código
  consultarCertificadoDigital(codigo: number): Observable<CertificadoDigital>{
    return this.httpClient.get<CertificadoDigital>(`${this.url}/${codigo}`);
  }

}