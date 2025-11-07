import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OpcaoValidade } from '../model/opcao-validade';

@Injectable({
  providedIn: 'root'
})
export class OpcaoValidadeService {

  private url = 'http://localhost:8080/copcaovalidade/opcoes';

  constructor(private http: HttpClient) {}

  listarOpcoesValidade(): Observable<OpcaoValidade[]> {
    return this.http.get<OpcaoValidade[]>(this.url);
  }

  consultarOpcaoValidade(id: number): Observable<OpcaoValidade> {
    return this.http.get<OpcaoValidade>(`${this.url}/${id}`);
  }

  inserirOpcaoValidade(opcao: OpcaoValidade): Observable<OpcaoValidade> {
    return this.http.post<OpcaoValidade>(this.url, opcao);
  }

  alterarOpcaoValidade(id: number, opcao: OpcaoValidade): Observable<OpcaoValidade> {
    return this.http.put<OpcaoValidade>(`${this.url}/${id}`, opcao);
  }

  excluirOpcaoValidade(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
