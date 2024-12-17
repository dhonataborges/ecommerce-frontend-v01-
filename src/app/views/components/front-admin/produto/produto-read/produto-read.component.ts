import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Produto } from 'src/app/models/Produto';
import { ProdutoService } from 'src/app/service/produto.service';
import { ConfirmDialogComponent } from '../../../mensagens-personalizadas/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produto-read',
  templateUrl: './produto-read.component.html',
  styleUrls: ['./produto-read.component.css']
})
export class ProdutoReadComponent implements AfterViewInit {

  produtos: Produto[] = [];

  displayedColumns: string[] = ['codProd', 'nomeProd', 'descricao', 'descriCatedoria', 'action'];
  dataSource = new MatTableDataSource<Produto>(this.produtos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: ProdutoService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef, // Injetando ChangeDetectorRef
    private router: Router) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe((resposta) => {
      this.produtos = resposta;
      this.dataSource = new MatTableDataSource<Produto>(this.produtos);
      this.dataSource.paginator = this.paginator;
    })
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja deletar este produto?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Chame a lógica para excluir o produto
        this.service.delete(id).subscribe(() => { 
          // Após deletar do backend, remove o produto do array local para refletir a exclusão na tabela
          this.produtos = this.produtos.filter(produto => produto.id !== id);
          this.service.message('Produto deletado com sucesso!');
          // Forçar a detecção de mudanças para garantir que a tabela seja atualizada
          this.cdRef.detectChanges();
        });
      } else {
        console.log('Deleção cancelada');
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['admin/produtos/create'])
  }
}

