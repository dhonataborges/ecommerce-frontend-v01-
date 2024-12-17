import { CurrencyPipe, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estoque } from 'src/app/models/Estoque';
import { Produto } from 'src/app/models/Produto';
import { EstoqueService } from 'src/app/service/estoque.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-estoque-create',
  templateUrl: './estoque-create.component.html',
  styleUrls: ['./estoque-create.component.css']
})
export class EstoqueCreateComponent implements OnInit {

  estoque: Estoque = {
    produto: {
      id: 0,
      codProd: '',
      nomeProd: '',
      descricao: '',
      categoria: 0,
      descriCatedoria: ''
    },
    dataEntrada: '',
    valorUnid: 0,
    qtdProd: 0
  }

  produtos: Produto [] = []

  constructor(
    private router: Router,
    private service: EstoqueService,
    private serviceProduto: ProdutoService,
    private datePipe: DatePipe,
    private http: HttpClient) { }

   // codProd = new FormControl('', [Validators.min(6), Validators.max(6)])
  
  ngOnInit(): void {
    this.listarProdutos();
  }
  
  cancel(): void {
    this.router.navigate(['admin/estoques'])
  }

  create(): void {

    // Formatar a data diretamente no objeto estoque
    this.estoque.dataEntrada = this.datePipe.transform(this.estoque.dataEntrada, 'yyyy-MM-dd')!;

    // Criação do objeto com o id do produto (sem o objeto completo)
    const estoqueParaEnviar = {
      produto: {     
        id: this.estoque.produto.id  // Envia apenas o 'id' do produto
      } as Produto, 
      dataEntrada: this.estoque.dataEntrada,
      valorUnid: this.estoque.valorUnid,
      qtdProd: this.estoque.qtdProd
    };

    // Enviar o objeto estoque com a data já formatada para o backend
    this.service.create(estoqueParaEnviar).subscribe((resposta) => {
      this.router.navigate(['admin/estoques']);
      this.service.message('Produto em estoque inserido com sucesso!');
    }, err => {
      if (err.error.error.match('já se encontra no estoque')) {
        this.service.message(err.error.error);
      }
    });
  }
  
  listarProdutos():void {
    this.serviceProduto.findAll().subscribe(resposta => {
      this.produtos = resposta;
    })
  }

}

