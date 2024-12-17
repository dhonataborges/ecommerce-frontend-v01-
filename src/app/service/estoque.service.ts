import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Estoque } from '../models/Estoque';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../environment.ts/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {
  apiUrl: String = environment.apiUrl;

  constructor(
    private http : HttpClient,
    private snack: MatSnackBar) {}

   
  findAll():Observable<Estoque[]> {
      const url = `${this.apiUrl}/admin/produto-em-estoque`
      return this.http.get<Estoque[]>(url);
  }

  findById(id : number):Observable<Estoque>{
    const url = `${this.apiUrl}/admin/produto-em-estoque/`+ id;
    return this.http.get<Estoque>(url);
  }

  create(estoque: Estoque):Observable<Estoque> {
    const url = `${this.apiUrl}/admin/produto-em-estoque`;
    return this.http.post<Estoque>(url, estoque);
  }

  update(estoque: Estoque):Observable<Estoque> {  
     // Criação do objeto com o id do produto (sem o objeto completo)
     const estoqueAtualizado = {
      produto: {     
        id: estoque.produto.id  // Envia apenas o 'id' do produto
      }, 
      dataEntrada: estoque.dataEntrada,
      valorUnid: estoque.valorUnid,
      qtdProd: estoque.qtdProd
    };  
    const url = `${this.apiUrl}/admin/produto-em-estoque/${estoque.id}`;
    return this.http.put<Estoque>(url, estoqueAtualizado);
  }

  delete(id : number):Observable<void> {
    const url = this.apiUrl + "/produto-em-estoque/" + id;
    return this.http.delete<void>(url);
  }

  message(msg: String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000,
      panelClass: ['custom-snackbar']
    })
  }

}
