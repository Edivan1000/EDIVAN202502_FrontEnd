import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CertificadoDigital } from '../model/certificadodigital';

@Injectable({
  providedIn: 'root'
})
export class CertificadoDigitalService {

  private url = "http://localhost:8080/ccertificadodigital/certificadodigital";
 
  constructor(private httpClient: HttpClient) { }

  //Métodos que consomem os serviços HTTP do backend
  listarCertificados(): Observable<CertificadoDigital[]> {
    console.log('Chamando backend...');
    return this.httpClient.get<CertificadoDigital[]>(`${this.url}`);
  }

  inserirCertificadoDigital(certificadodigital: CertificadoDigital): Observable<object>{
    return this.httpClient.post(`${this.url}`, certificadodigital);
  }

  alterarCertificadoDigital(codigo: number, certificadodigital: CertificadoDigital): Observable<object>{
    return this.httpClient.put(`${this.url}/${codigo}`, certificadodigital);
  }
  
  excluirCertificadoDigital(codigo: number): Observable<object>{
    return this.httpClient.delete(`${this.url}/${codigo}`);
  }

  consultarCertificadoDigital(codigo: number): Observable<CertificadoDigital>{
    return this.httpClient.get<CertificadoDigital>(`${this.url}/${codigo}`);
  }

}