import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavComponent } from './views/components/front-cliente/template/nav/nav.component';
import { HomeComponent } from './views/components/front-cliente/home/home.component';
import { CarrosselProdComponent } from './views/components/front-cliente/carrosseis/carrossel-prod/carrossel-prod.component';
import { CardProdComponent } from './views/components/front-cliente/cards/card-prod/card-prod.component';
import { FooterComponent } from './views/components/front-cliente/template/footer/footer.component';

import { RouterLinkActive } from '@angular/router';

import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatMenuModule} from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { PerfumariaComponent } from './views/components/front-cliente/linha-cosmeticos/perfumaria/perfumaria.component';
import { HeaderComponent } from './views/components/front-cliente/template/header/header.component';
import { MeusPedidosComponent } from './views/components/front-cliente/linha-cosmeticos/meus-pedidos/meus-pedidos.component';
import { RostoComponent } from './views/components/front-cliente/linha-cosmeticos/rosto/rosto.component';
import { MaquiagemComponent } from './views/components/front-cliente/linha-cosmeticos/maquiagem/maquiagem.component';
import { InfantilComponent } from './views/components/front-cliente/linha-cosmeticos/infantil/infantil.component';
import { TesteFrontComponent } from './views/components/teste-front/teste-front.component';
import { HttpClientModule } from '@angular/common/http';
import { CorpoEBanhoComponent } from './views/components/front-cliente/linha-cosmeticos/corpo-e-banho/corpo-e-banho.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import {CommonModule, DatePipe, DecimalPipe } from '@angular/common';


import ptBr from '@angular/common/locales/pt';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import { AdminHeaderComponent } from './views/components/front-admin/template/admin-header/admin-header.component';
import { AdminNavComponent } from './views/components/front-admin/template/admin-nav/admin-nav.component';
import { AdminFooterComponent } from './views/components/front-admin/template/admin-footer/admin-footer.component';
import { ClienteComponent } from './views/components/front-cliente/cliente/cliente.component';
import { AdminComponent } from './views/components/front-admin/admin/admin.component';
import { ProdutoReadComponent } from './views/components/front-admin/produto/produto-read/produto-read.component';
import { ProdutoUpdateComponent } from './views/components/front-admin/produto/produto-update/produto-update.component';
import { ProdutoCreateComponent } from './views/components/front-admin/produto/produto-create/produto-create.component';
import { ConfirmDialogComponent } from './views/components/mensagens-personalizadas/confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EstoqueHeadComponent } from './views/components/front-admin/estoque/estoque-head/estoque-head.component';
import { EstoqueCreateComponent } from './views/components/front-admin/estoque/estoque-create/estoque-create.component';
import { EstoqueUpdateComponent } from './views/components/front-admin/estoque/estoque-update/estoque-update.component';
import { AdminHomeComponent } from './views/components/front-admin/template/admin-home/admin-home.component';
import { VendaCreateComponent } from './views/components/front-admin/venda-produtos/venda-create/venda-create.component';
import { VendaUpdateComponent } from './views/components/front-admin/venda-produtos/venda-update/venda-update.component';
import { VendaReadComponent } from './views/components/front-admin/venda-produtos/venda-read/venda-read.component';
import { CabelosComponent } from './views/components/front-cliente/linha-cosmeticos/cabelos/cabelos.component';
import { PedidosReadComponent } from './views/components/front-admin/pedidos/pedidos-read/pedidos-read.component';
import { PedidosUpdateComponent } from './views/components/front-admin/pedidos/pedidos-update/pedidos-update.component';

registerLocaleData(ptBr);

export const customCurrencyMaskConfig: CurrencyMaskConfig = {
  align: 'left',
  allowNegative: true,
  decimal: ',',
  precision: 2,
  prefix: 'R$',
  suffix: '',
  thousands: '.'
};

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CarrosselProdComponent,
    CardProdComponent,
    FooterComponent,
    CorpoEBanhoComponent,
    PerfumariaComponent,
    CabelosComponent,
    HeaderComponent,
    MeusPedidosComponent,
    RostoComponent,
    MaquiagemComponent,
    InfantilComponent,
    TesteFrontComponent,
    AdminHeaderComponent,
    AdminNavComponent,
    AdminFooterComponent,
    ClienteComponent,
    AdminComponent,
    ProdutoReadComponent,
    ProdutoUpdateComponent,
    ProdutoCreateComponent,
    AdminHomeComponent,
    ConfirmDialogComponent,
    EstoqueHeadComponent,
    EstoqueCreateComponent,
    EstoqueUpdateComponent,
    VendaCreateComponent,
    VendaUpdateComponent,
    VendaReadComponent,
    PedidosReadComponent,
    PedidosUpdateComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterLinkActive,
    AppRoutingModule,
    HttpClientModule,
    CurrencyMaskModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatMenuModule,
    MatDialogModule,
    FormsModule,
    CurrencyPipe,
    MatNativeDateModule,
    DatePipe,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
     DatePipe, DecimalPipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: CURRENCY_MASK_CONFIG, useValue: customCurrencyMaskConfig }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  ]
})
export class AppModule { }