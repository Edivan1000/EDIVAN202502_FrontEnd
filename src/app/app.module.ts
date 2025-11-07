import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { InicioComponent } from './view/inicio/inicio.component';
import { CertificadoDigitalComponent } from './view/certificadodigital/certificadodigital.component';
import { ClienteComponent } from './view/cliente/cliente.component';
import { EmpresaComponent } from './view/empresa/empresa.component';
import { ProdutoComponent } from './view/produto/produto.component';
import { ProdutoOpcaoComponent } from './view/produto-opcao/produto-opcao.component';
import { OpcaoValidadeComponent } from './view/opcao-validade/opcao-validade.component';
import { OrcamentoComponent } from './view/orcamento/orcamento.component';
import { OrcamentoMestreComponent } from './view/orcamento-mestre/orcamento-mestre.component';

@NgModule({
  declarations: [
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }