import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produto.service';

@Component({
  selector: 'app-teste-front',
  templateUrl: './teste-front.component.html',
  styleUrls: ['./teste-front.component.css']
})
export class TesteFrontComponent implements AfterViewInit {

  lista: Produto[] = [];

  displayedColumns: string[] = ['id', 'codProd', 'nomeProd', 'descProd', 'categoria', 'action'];
  dataSource = new MatTableDataSource<Produto>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ProdutoService,
    private router: Router) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe((resposta) => {
      resposta
      this.dataSource = new MatTableDataSource<Produto>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void {
    this.router.navigate(['produto/create'])
  }
}

