import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // URL base do backend
  private url = 'http://localhost:8080/ccliente/cliente';

  constructor(private http: HttpClient) {}

  /** Lista todos os clientes */
  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url);
  }

  /** Consulta um cliente pelo ID */
  consultarCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.url}/${id}`);
  }

  /** Insere um novo cliente */
  inserirCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.url, cliente);
  }

  /** Atualiza um cliente existente */
  alterarCliente(id: number, cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.url}/${id}`, cliente);
  }

  /** Exclui um cliente */
  excluirCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

}
