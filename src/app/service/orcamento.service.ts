import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Orcamento } from '../model/orcamento';

@Injectable({
  providedIn: 'root'
})
export class OrcamentoService {

  private url = 'http://localhost:8080/corcamento/orcamento';

  constructor(private http: HttpClient) {}

  listarOrcamentos(): Observable<Orcamento[]> {
    return this.http.get<Orcamento[]>(this.url);
  }

  consultarOrcamento(id: number): Observable<Orcamento> {
    return this.http.get<Orcamento>(`${this.url}/${id}`);
  }

  inserirOrcamento(orcamento: Orcamento): Observable<Orcamento> {
    return this.http.post<Orcamento>(this.url, orcamento);
  }

  alterarOrcamento(id: number, orcamento: Orcamento): Observable<Orcamento> {
    return this.http.put<Orcamento>(`${this.url}/${id}`, orcamento);
  }

  excluirOrcamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
