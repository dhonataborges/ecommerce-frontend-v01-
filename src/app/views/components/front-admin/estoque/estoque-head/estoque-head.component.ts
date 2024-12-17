import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Estoque } from 'src/app/models/Estoque';
import { EstoqueService } from 'src/app/service/estoque.service';
import { ConfirmDialogComponent } from '../../../mensagens-personalizadas/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-estoque-head',
  templateUrl: './estoque-head.component.html',
  styleUrls: ['./estoque-head.component.css']
})
export class EstoqueHeadComponent implements AfterViewInit {

  estoques: Estoque[] = [];

  displayedColumns: string[] = ['codProd', 'nomeProd', 'dataEntrada', 'dataSaida', 'valorUnid', 'qtdProd', 'valorTotalProd', 'action'];
  dataSource = new MatTableDataSource<Estoque>(this.estoques);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: EstoqueService,
    private dialog: MatDialog,
    private cdRef: ChangeDetectorRef, // Injetando ChangeDetectorRef
    private router: Router) { }

  ngAfterViewInit() {
    this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe((resposta) => {
      this.estoques = resposta;
      this.dataSource = new MatTableDataSource<Estoque>(this.estoques);
      this.dataSource.paginator = this.paginator;
    })
  }

  delete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Tem certeza que deseja deletar este produto do estoque?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Chame a lógica para excluir o produto do estoque
        this.service.delete(id).subscribe(() => { 
          // Após deletar do backend, remove o produto do array local para refletir a exclusão na tabela
          this.estoques = this.estoques.filter(produto => produto.id !== id);
          this.service.message('Produto do estoque deletado com sucesso!');
          // Forçar a detecção de mudanças para garantir que a tabela seja atualizada
          this.cdRef.detectChanges();
        });
      } else {
        console.log('Deleção cancelada');
      }
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['admin/estoques/create'])
    
  }
  
}
