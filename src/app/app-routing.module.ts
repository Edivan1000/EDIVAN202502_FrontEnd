import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Importa os componentes usados nas rotas
import { InicioComponent } from './view/inicio/inicio.component';
import { CertificadodigitalListaComponent } from './view/certificadodigital-lista/certificadodigital-lista.component';
import { CertificadodigitalInsereComponent } from './view/certificadodigital-insere/certificadodigital-insere.component'
import { CertificadodigitalAlteraComponent } from  './view/certificadodigital-altera/certificadodigital-altera.component'
import { CertificadoDigitalConsultaComponent } from './view/certificadodigital-consulta/certificadodigital-consulta.component'

// Define as rotas do sistema
const routes: Routes = [
  // Redireciona a rota vazia para a tela inicial
  {path: '', redirectTo: 'inicio', pathMatch: 'full'},

  // Rota para listagem de certificados
  {path: 'certificadodigital-lista', component: CertificadodigitalListaComponent},

  // Rota para alteração de certificado (recebe o código via URL)
  {path: 'certificadodigital-altera/:codigo',component: CertificadodigitalAlteraComponent},

  // Rota para inserção de novo certificado
  {path: 'certificadodigital-insere',component: CertificadodigitalInsereComponent},

  // Rota para consulta de certificado (recebe o código via URL)
  {path: 'certificadodigital-consulta/:codigo',component: CertificadoDigitalConsultaComponent},

  // Rota para a tela inicial
  {path: 'inicio', component: InicioComponent}

];

// Configura o módulo de rotas
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
