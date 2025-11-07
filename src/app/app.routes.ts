import { Routes } from '@angular/router';

import { InicioComponent } from './view/inicio/inicio.component';
import { ClienteComponent } from './view/cliente/cliente.component';
import { EmpresaComponent } from './view/empresa/empresa.component';
import { ProdutoComponent } from './view/produto/produto.component';
import { ProdutoOpcaoComponent } from './view/produto-opcao/produto-opcao.component';
import { OpcaoValidadeComponent } from './view/opcao-validade/opcao-validade.component';
import { OrcamentoComponent } from './view/orcamento/orcamento.component';
import { OrcamentoMestreComponent } from './view/orcamento-mestre/orcamento-mestre.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'cliente', component: ClienteComponent },
  { path: 'empresa', component: EmpresaComponent },
  { path: 'produto', component: ProdutoComponent },
  { path: 'produto-opcao', component: ProdutoOpcaoComponent },
  { path: 'opcao-validade', component: OpcaoValidadeComponent },
  { path: 'orcamento', component: OrcamentoComponent },
  { path: 'orcamento-mestre', component: OrcamentoMestreComponent } // standalone também funciona via rota
];
