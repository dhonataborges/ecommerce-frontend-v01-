import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estoque } from 'src/app/models/Estoque';
import { VendaProduto } from 'src/app/models/VendaProduto';
import { EstoqueService } from 'src/app/service/estoque.service';
import { VendaProdutoService } from 'src/app/service/vendaProduto.service';

@Component({
  selector: 'app-venda-update',
  templateUrl: './venda-update.component.html',
  styleUrls: ['./venda-update.component.css']
})
export class VendaUpdateComponent  implements  OnInit {

  id_venda ='';
  
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
    valorVenda: 0,
    numParcela: 0,
    valorParcela: 0,
    descontoPorcento: 0
  }

  estoques: Estoque [] = []

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: VendaProdutoService,
    private serviceEstoque: EstoqueService,
    private datePipe: DatePipe,
    private http: HttpClient) { }

   // codProd = new FormControl('', [Validators.min(6), Validators.max(6)])
  
  ngOnInit(): void {
    this.id_venda = this.route.snapshot.paramMap.get('id')!
    this.listarProdutoEstoque();
    this.findById();
  }
  
  cancel(): void {
    this.router.navigate(['admin/venda-produtos'])
  }

  update(): void {
    // Enviar o objeto estoque com a data já formatada para o backend
    this.service.update(this.venda).subscribe((resposta) => {
      this.router.navigate(['admin/venda-produtos']);
      this.service.message('Produto a venda atualizado com sucesso!');
    }, err => {
      if (err.error.error.match('já se encontra no para venda')) {
        this.service.message(err.error.error);
      }
    });
  }
  
  findById(): void {
    const vendaId = parseInt(this.id_venda)
    this.service.findById(vendaId).subscribe(resposta => {
      this.venda = resposta;
    })
  }
  
  listarProdutoEstoque():void {
    this.serviceEstoque.findAll().subscribe(resposta => {
      this.estoques = resposta;
    })
  }

  onProdutoChange(event: any) {
  const produtoSelecionado = event.value;  // Produto selecionado pelo usuário
  this.venda.estoque = produtoSelecionado; // Associar o estoque ao produto
  }

}
