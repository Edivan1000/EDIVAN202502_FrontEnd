import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CertificadoDigital } from '../model/certificadodigital';

@Injectable({
  providedIn: 'root'
})
export class CertificadoDigitalService {

  private url = "http://localhost:8080/certificados/certificadodigital";

  constructor(private httpClient: HttpClient) { }

  //Métodos que consomem os serviços HTTP do backend
  listarCertificados(): Observable<CertificadoDigital[]> {
    return this.httpClient.get<CertificadoDigital[]>(`${this.url}`);
  }

}