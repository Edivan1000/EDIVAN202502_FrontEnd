import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empresa } from '../model/empresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private url = 'http://localhost:8080/cempresa/empresa';

  constructor(private http: HttpClient) {}

  /** Lista todas as empresas */
  listarEmpresas(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.url);
  }

  /** Consulta uma empresa pelo ID */
  consultarEmpresa(id: number): Observable<Empresa> {
    return this.http.get<Empresa>(`${this.url}/${id}`);
  }

  /** Insere uma nova empresa */
  inserirEmpresa(empresa: Empresa): Observable<Empresa> {
    return this.http.post<Empresa>(this.url, empresa);
  }

  /** Atualiza uma empresa existente */
  alterarEmpresa(id: number, empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(`${this.url}/${id}`, empresa);
  }

  /** Exclui uma empresa */
  excluirEmpresa(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
