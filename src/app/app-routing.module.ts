import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/components/front-cliente/home/home.component';
import { PerfumariaComponent } from './views/components/front-cliente/linha-cosmeticos/perfumaria/perfumaria.component';
import { CorpoEBanhoComponent } from './views/components/front-cliente/linha-cosmeticos/corpo-e-banho/corpo-e-banho.component';
import { MeusPedidosComponent } from './views/components/front-cliente/linha-cosmeticos/meus-pedidos/meus-pedidos.component';
import { CabelosComponent } from './views/components/front-cliente/linha-cosmeticos/cabelos/cabelos.component';
import { RostoComponent } from './views/components/front-cliente/linha-cosmeticos/rosto/rosto.component';
import { MaquiagemComponent } from './views/components/front-cliente/linha-cosmeticos/maquiagem/maquiagem.component';
import { InfantilComponent } from './views/components/front-cliente/linha-cosmeticos/infantil/infantil.component';
import { TesteFrontComponent } from './views/components/teste-front/teste-front.component';
import { ProdutoReadComponent } from './views/components/front-admin/produto/produto-read/produto-read.component';
import { ProdutoUpdateComponent } from './views/components/front-admin/produto/produto-update/produto-update.component';
import { ProdutoCreateComponent } from './views/components/front-admin/produto/produto-create/produto-create.component';
import { EstoqueHeadComponent } from './views/components/front-admin/estoque/estoque-head/estoque-head.component';
import { EstoqueCreateComponent } from './views/components/front-admin/estoque/estoque-create/estoque-create.component';
import { EstoqueUpdateComponent } from './views/components/front-admin/estoque/estoque-update/estoque-update.component';
import { AdminHomeComponent } from './views/components/front-admin/template/admin-home/admin-home.component';
import { VendaReadComponent } from './views/components/front-admin/venda-produtos/venda-read/venda-read.component';
import { VendaCreateComponent } from './views/components/front-admin/venda-produtos/venda-create/venda-create.component';
import { VendaUpdateComponent } from './views/components/front-admin/venda-produtos/venda-update/venda-update.component';

const routes: Routes = [
  {path:'',
    children: [
      {path: '', component: HomeComponent},
      {path: 'home', component: HomeComponent},
      {path: 'meus-pedidos', component: MeusPedidosComponent},
      {path: 'perfumaria', component: PerfumariaComponent},
      {path: 'perfumaria/:tipoProdEstoque', component: PerfumariaComponent},  
      {path: 'corpo-e-banho', component: CorpoEBanhoComponent},
      {path: 'cabelos', component: CabelosComponent},
      {path: 'rosto', component: RostoComponent},  
      {path: 'maquiagem', component: MaquiagemComponent},
      {path: 'infantil', component: InfantilComponent},
    
      {path: 'teste', component: TesteFrontComponent}
      
    ]
  },

  {path: 'admin',
    children: [
      {path: 'admin-home', component: AdminHomeComponent},
      {path: 'produtos', component: ProdutoReadComponent},
      {path: 'produtos/create', component: ProdutoCreateComponent},
      {path: 'produtos/update/:id', component: ProdutoUpdateComponent},
      
      {path: 'estoques', component: EstoqueHeadComponent},
      {path: 'estoques/create', component: EstoqueCreateComponent},
      {path: 'estoques/update/:id', component: EstoqueUpdateComponent},

      {path: 'venda-produtos', component: VendaReadComponent},
      {path: 'venda-produtos/create', component: VendaCreateComponent},
      {path: 'venda-produtos/update/:id', component: VendaUpdateComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
