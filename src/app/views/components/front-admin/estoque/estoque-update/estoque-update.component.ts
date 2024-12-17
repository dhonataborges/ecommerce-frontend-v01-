import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estoque } from 'src/app/models/Estoque';
import { Produto } from 'src/app/models/Produto';
import { EstoqueService } from 'src/app/service/estoque.service';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-estoque-update',
  templateUrl: './estoque-update.component.html',
  styleUrls: ['./estoque-update.component.css']
})
export class EstoqueUpdateComponent  implements OnInit {


  id_estoque ='';

  estoque: Estoque = {
    id:0,
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
    private route: ActivatedRoute,
    private router: Router,
    private service: EstoqueService,
    private serviceProduto: ProdutoService,
    private datePipe: DatePipe) { }

   // codProd = new FormControl('', [Validators.min(6), Validators.max(6)])
  
  ngOnInit(): void {
    this.id_estoque = this.route.snapshot.paramMap.get('id')!
    this.findById();
    this.listarProdutos();
  }
  
  cancel(): void {
    this.router.navigate(['admin/estoques'])
  }
  
  update(): void {
    // Formatar a data diretamente no objeto estoque
    this.estoque.dataEntrada = this.datePipe.transform(this.estoque.dataEntrada, 'yyyy-MM-dd')!;
  
    // Enviar o objeto estoque com a data já formatada para o backend
    this.service.update(this.estoque).subscribe((resposta) => {
      this.router.navigate(['admin/estoques']);
      this.service.message('Produto em estoque atualizado com sucesso!');
    }, err => {
      if (err.error.error.match('já se encontra no estoque')) {
        this.service.message(err.error.error);
      }
    });
  }
  
  findById(): void {
    const estoqueId = parseInt(this.id_estoque)
    this.service.findById(estoqueId).subscribe(resposta => {
      this.estoque = resposta;
    })
  }
  
  listarProdutos():void {
    this.serviceProduto.findAll().subscribe(resposta => {
      this.produtos = resposta;
    })
  }


  // errorValidCodProd() {
  //   if (this.codProd.invalid) {
  //     return 'O Codigo deve ter entre 6 caracteres!';
  //   }
  //   return false;
  // }

}

