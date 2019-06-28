import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewFornecedorComponent } from './new-fornecedor/new-fornecedor.component';
import { NewPedidoComponent } from './new-pedido/new-pedido.component';
import { NewItemComponent } from './new-item/new-item.component';
import { NewNotaFiscalComponent } from './new-nota-fiscal/new-nota-fiscal.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditUserResolver } from './edit-user/edit-user.resolver';


export const rootRouterConfig: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'new-fornecedor', component: NewFornecedorComponent },
  { path: 'new-pedido', component: NewPedidoComponent },
  { path: 'new-nota-fiscal', component: NewNotaFiscalComponent },
  { path: 'new-item', component: NewItemComponent },
  { path: 'details/:id', component: EditUserComponent, resolve:{data : EditUserResolver} }
];
