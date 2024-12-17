import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FotoProduto } from '../models/FotoProduto';
import { Produto } from '../models/Produto';
import { ProdutoService } from './produto.service';
import { environment } from '../environment.ts/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CatalogoFotoProdutoService {
  
  apiUrl: String = environment.apiUrl;
  imageSrc: string | undefined;

  fotos: FotoProduto[] = [];
  produto: Produto | undefined;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private serviceProduto: ProdutoService
  ) {}

  // Método para buscar a imagem de um produto pelo ID
  fotoBuscar(prod_id: number): Observable<FotoProduto> {
    const url = `${this.apiUrl}/admin/produtos/${prod_id}/foto`;
    return this.http.get<FotoProduto>(url);
  }

  // Método para obter foto e os headers da resposta
  servirFoto(prod_id: number, acceptHeader: string): Observable<any> {
    const url = `${this.apiUrl}/admin/produtos/${prod_id}/foto`;

    // Definindo os cabeçalhos explicitamente
    const headers = new HttpHeaders().set('Accept', acceptHeader);

    // Usando 'observe: "response"' para observar toda a resposta, incluindo os headers
    return this.http.get(url, { headers, observe: 'response', responseType: 'blob' });
  }
  
  atualizarFoto(prod_id: number, formData: FormData): Observable<FotoProduto> {
    // Criação do objeto com o id do produto (sem o objeto completo)

    const url = `${this.apiUrl}/admin/produtos/${prod_id}/foto`; // URL para onde o arquivo será enviado
    return this.http.put<any>(url, formData); // Envia o FormData para a API
  }
}
