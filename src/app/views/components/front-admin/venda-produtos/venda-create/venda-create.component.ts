import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estoque } from 'src/app/models/Estoque';
import { Produto } from 'src/app/models/Produto';
import { VendaProduto } from 'src/app/models/VendaProduto';
import { EstoqueService } from 'src/app/service/estoque.service';
import { VendaProdutoService } from 'src/app/service/vendaProduto.service';

@Component({
  selector: 'app-venda-create',
  templateUrl: './venda-create.component.html',
  styleUrls: ['./venda-create.component.css']
})
export class VendaCreateComponent implements OnInit {
  
  venda: VendaProduto = {
    estoque: {
      id: 0,
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
    },
    valorVenda: 0.0,
    numParcela: 0,
    valorParcela: 0.0,
    descontoPorcento: 0.0
  }

  estoques: Estoque [] = []

  constructor(
    private router: Router,
    private service: VendaProdutoService,
    private serviceEstoque: EstoqueService,
    private decimalPipe: DecimalPipe
  ) { }

   // codProd = new FormControl('', [Validators.min(6), Validators.max(6)])
  
  ngOnInit(): void {
    this.listarProdutoEstoque();    
   // this.id_estoque = this.route.snapshot.paramMap.get('id')!
  }

  cancel(): void {
    this.router.navigate(['admin/venda-produtos'])
  }

  create(): void {
     // Criação do objeto com o id do produto (sem o objeto completo)
     const vendaParaEnviar = {
       estoque: {
         id: this.venda.estoque.id, // Envia apenas o 'id' do produto
         produto: {
           id: this.venda.estoque.produto.id
         },
       },
       valorVenda: parseFloat(this.venda.valorVenda.toFixed(2)),
       numParcela: this.venda.numParcela,
       descontoPorcento: parseFloat(this.venda.descontoPorcento.toFixed(2))
     } as unknown as VendaProduto;

     console.log("Esta aqui:",vendaParaEnviar)
     
    // Enviar o objeto estoque com a data já formatada para o backend
    this.service.create(vendaParaEnviar).subscribe((resposta) => {
      this.router.navigate(['admin/venda-produtos']);
      this.service.message('Produto inserido com sucesso!');
    }, err => {
      if (err.error.error.match('já se encontra no para venda')) {
        this.service.message(err.error.error);
      }
    });
  }
    
    
  listarProdutoEstoque(): void {
    this.serviceEstoque.findAll().subscribe(resposta => {
      this.estoques = resposta; // Armazena a lista de estoques recebida
    });
  }

  onProdutoChange(event: any) {
  const produtoSelecionado = event.value;  // Produto selecionado pelo usuário
  this.venda.estoque = produtoSelecionado; // Associar o estoque ao produto
  }

  
  /*buscarValorUnidProd() : void {
    this.serviceEstoque.findById().subscribe(resposta => {

    })
  }*/


}

