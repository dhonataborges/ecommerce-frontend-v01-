import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../models/Produto';
import { environment } from '../environment.ts/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  apiUrl: String = environment.apiUrl;

  constructor(private http: HttpClient, private snack: MatSnackBar) {}

  findAll(): Observable<Produto[]> {
    const url = `${this.apiUrl}/admin/produtos`;
    return this.http.get<Produto[]>(url);
  }

  /** MÉTODO DE BUSCAR OS PRODUTOS PELO */
  findById(id: number): Observable<Produto> {
    const url = `${this.apiUrl}/admin/produtos/` + id;
    return this.http.get<Produto>(url);
  }

  /** MÉTODO PARA CRIAR UM NOVO PRODUTO*/
  create(produto: Produto): Observable<Produto> {
    const url = this.apiUrl + '/admin/produtos';
    return this.http.post<Produto>(url, produto);
  }

  /** MÉTODO DE ATUALIZAR PRODUTO */
  update(produto: Produto): Observable<Produto> {
    const produtoAtualizado = {
      codProd: produto.codProd,
      nomeProd: produto.nomeProd,
      descricao: produto.descricao,
      categoria: produto.categoria,
    };
    const url = `${this.apiUrl}/admin/produtos/${produto.id}`;
    return this.http.put<Produto>(url, produtoAtualizado);
  }

  // Método para deletar um produto pelo ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/admin/produtos/${id}`);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000,
      panelClass: ['custom-snackbar'],
    });
  }
}
