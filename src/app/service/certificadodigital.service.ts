import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CertificadoDigital } from '../model/certificadodigital';

@Injectable({
  providedIn: 'root'
})
export class CertificadoDigitalService {

  // URL base da API (ajuste se o endpoint mudar)
  private baseUrl = 'http://localhost:8080/ccertificadodigital/certificadodigital';
 
  constructor(private http: HttpClient) { }

  /** Lista todos os certificados */
  listarCertificados(): Observable<CertificadoDigital[]> {
    console.log('Chamando backend: listando certificados...');
    return this.http.get<CertificadoDigital[]>(this.baseUrl);
  }

  /** Insere um novo certificado */
  inserir(certificado: CertificadoDigital): Observable<CertificadoDigital> {
    return this.http.post<CertificadoDigital>(this.baseUrl, certificado);
  }

  /** Altera um certificado existente */
  alterar(codigo: number, certificado: CertificadoDigital): Observable<CertificadoDigital> {
    return this.http.put<CertificadoDigital>(`${this.baseUrl}/${codigo}`, certificado);
  }
  
  /** Exclui um certificado */
  excluir(codigo: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${codigo}`);
  }

  /** Consulta um certificado pelo código */
  consultar(codigo: number): Observable<CertificadoDigital> {
    return this.http.get<CertificadoDigital>(`${this.baseUrl}/${codigo}`);
  }

}
