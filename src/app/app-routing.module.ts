import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './view/inicio/inicio.component';
import { CertificadodigitalListaComponent } from './view/certificadodigital-lista/certificadodigital-lista.component';
import { CertificadodigitalInsereComponent } from './view/certificadodigital-insere/certificadodigital-insere.component'
import { CertificadodigitalAlteraComponent } from  './view/certificadodigital-altera/certificadodigital-altera.component'
import { CertificadoDigitalConsultaComponent } from './view/certificadodigital-consulta/certificadodigital-consulta.component'
const routes: Routes = [

  {path: '', redirectTo: 'inicio', pathMatch: 'full'},
  {path: 'certificadodigital-lista', component: CertificadodigitalListaComponent},
  {path: 'certificadodigital-altera/:codigo',component: CertificadodigitalAlteraComponent},
  {path: 'certificadodigital-insere',component: CertificadodigitalInsereComponent},
  {path: 'certificadodigital-consulta/:codigo',component: CertificadoDigitalConsultaComponent},
  {path: 'inicio', component: InicioComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
