import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { VendaProduto } from 'src/app/models/VendaProduto';
import { VendaProdutoService } from 'src/app/service/vendaProduto.service';
import { ConfirmDialogComponent } from '../../../mensagens-personalizadas/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-venda-read',
  templateUrl: './venda-read.component.html',
  styleUrls: ['./venda-read.component.css']
})
export class VendaReadComponent implements AfterViewInit {

  vendas: VendaProduto[] = [];

  displayedColumns: string[] = ['codProd', 'nomeProd', 'descriCatedoria','valorUnid', 'qtdProd', 'valorVenda', 'numParcela', 'valorParcela', 'descontaPorcento', 'action'];
  dataSource = new MatTableDataSource<VendaProduto>(this.vendas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: VendaProdutoService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef, // Injetando ChangeDetectorRef
    private router: Router) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe((resposta) => {
      this.vendas = resposta;
      this.dataSource = new MatTableDataSource<VendaProduto>(this.vendas);
      this.dataSource.paginator = this.paginator;
    })
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja deletar este veda?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Chame a lógica para excluir o produto
        this.service.delete(id).subscribe(() => { 
          // Após deletar do backend, remove o produto do array local para refletir a exclusão na tabela
          this.vendas = this.vendas.filter(venda => venda.id !== id);
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
    this.router.navigate(['admin/venda-produtos/create'])
  }
}


