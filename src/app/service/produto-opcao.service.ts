import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProdutoOpcao } from '../model/produto-opcao';

@Injectable({
  providedIn: 'root'
})
export class ProdutoOpcaoService {

  private url = 'http://localhost:8080/cprodutoopcao/produtoopcao';

  constructor(private http: HttpClient) {}

  listarProdutoOpcoes(): Observable<ProdutoOpcao[]> {
    return this.http.get<ProdutoOpcao[]>(this.url);
  }

  consultarProdutoOpcao(id: number): Observable<ProdutoOpcao> {
    return this.http.get<ProdutoOpcao>(`${this.url}/${id}`);
  }

  inserirProdutoOpcao(produtoOpcao: ProdutoOpcao): Observable<ProdutoOpcao> {
    return this.http.post<ProdutoOpcao>(this.url, produtoOpcao);
  }

  alterarProdutoOpcao(id: number, produtoOpcao: ProdutoOpcao): Observable<ProdutoOpcao> {
    return this.http.put<ProdutoOpcao>(`${this.url}/${id}`, produtoOpcao);
  }

  excluirProdutoOpcao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}