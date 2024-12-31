import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VendaProduto } from '../models/VendaProduto';
import { environment } from '../environment.ts/environment';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Produto } from '../models/Produto';
import { Estoque } from '../models/Estoque';

@Injectable({
  providedIn: 'root'
})
export class VendaProdutoService {

  apiUrl: String = environment.apiUrl;

  constructor(
    private http : HttpClient,
    private route : ActivatedRoute,
    private snack: MatSnackBar
  ) {}

  findAll():Observable<VendaProduto[]> {
    const url = `${this.apiUrl}/admin/produto-a-venda`
    return this.http.get<VendaProduto[]>(url);
  }

  bucarCosmeticos(categoria : number, rota: string):Observable<VendaProduto[]>{
    
    categoria = 1;

    switch(rota) {
      case "/perfumaria":
        categoria = 1
        break;
      case "/corpo-e-banho":
        categoria = 2
          break;
      case "/cabelos":
        categoria = 3
          break;
      case "/rosto":
        categoria = 4
            break;
      case "/maquiagem":
        categoria = 5
          break;
      case "/infantil":
        categoria = 6
          break;
      default:
        categoria= 0;
          break;
    } 

    const url = `${this.apiUrl}/admin/produto-a-venda/cosmeticos?categoria=${categoria}`;
    return this.http.get<VendaProduto[]>(url);

  }

  findById(id : number):Observable<VendaProduto>{
    const url = this.apiUrl + "/admin/produto-a-venda/" + id;
    return this.http.get<VendaProduto>(url);
  }

  create(vendaProduto: VendaProduto):Observable<VendaProduto> {
    const url = `${this.apiUrl}/admin/produto-a-venda`;
    return this.http.post<VendaProduto>(url, vendaProduto);
  }

  update(vendaProduto: VendaProduto):Observable<VendaProduto> {
    // Criação do objeto com o id do produto (sem o objeto completo)
    const vendaAtualizada = {
      estoque: {     
        id: vendaProduto.estoque.id,  // Envia apenas o 'id' do produto
        produto: {
          id: vendaProduto.estoque.produto.id
        },
      }, 
      valorVenda: vendaProduto.valorVenda,
      numParcela: vendaProduto.numParcela,
      descontoPorcento: vendaProduto.descontoPorcento
    };
    const url = `${this.apiUrl}/admin/produto-a-venda/${vendaProduto.id}`;
    return this.http.put<VendaProduto>(url, vendaAtualizada);
  }

  delete(id : number):Observable<void> {
    const url = this.apiUrl + "/admin/produto-a-venda/" + id;
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

