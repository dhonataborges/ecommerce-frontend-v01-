import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environment.ts/environment.prod';
import { Produto } from 'src/app/models/Produto';
import { VendaProduto } from 'src/app/models/VendaProduto';
import { ProdutoService } from 'src/app/service/produto.service';
import { VendaProdutoService } from 'src/app/service/vendaProduto.service';

@Component({
  selector: 'app-corpo-e-banho',
  templateUrl: './corpo-e-banho.component.html',
  styleUrls: ['./corpo-e-banho.component.css']
})
export class CorpoEBanhoComponent implements OnInit{

  apiUrl: String = environment.apiUrl;

  
  cosmeticos: VendaProduto[] = [];
  images: { [key: number]: string } = {};
  produtos: Produto[] = [];
  
  tipoCategoria: any;
  rota: any;


  constructor(
    private serviceProduto: ProdutoService,
    private serviceVenda : VendaProdutoService,
    private router : Router,
    private http: HttpClient) {}

  ngOnInit(): void {
   this.bucarCosmeticos();   
   this.buscarFoto()
  }

  bucarCosmeticos(){
    this.rota = this.router.url
    this.serviceVenda.bucarCosmeticos(this.tipoCategoria, this.rota).subscribe((resposta) => {
    this.cosmeticos = resposta;
    })
  }

  buscarFoto() {
    this.produtos = [];  // Limpa a lista de produtos
    this.images = {};
  
    this.serviceProduto.findAll().subscribe((data: Produto[]) => {
      this.produtos = data;  // Atribui os produtos recebidos à variável produtos
  
      const headers = new HttpHeaders({
        'Accept': 'image/jpeg,image/png'  
      });
  
      // Para cada produto, faça a requisição da foto
      this.produtos.forEach((prod) => {
        const prod_id = prod.id;
        const url = `${this.apiUrl}/admin/produtos/${prod_id}/foto`;
  
        // Fazendo a requisição para pegar a foto
        this.http.get(url, { headers, responseType: 'blob' }).subscribe(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            // Associa a imagem ao produto atual
            this.images[prod_id!] = reader.result as string;
          };
          reader.readAsDataURL(blob);
        });
      });
    });
  }
  
  }
  
