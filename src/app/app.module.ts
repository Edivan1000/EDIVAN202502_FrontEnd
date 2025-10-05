import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InicioComponent } from './view/inicio/inicio.component';
import { CertificadodigitalInsereComponent } from './view/certificadodigital-insere/certificadodigital-insere.component';
import { CertificadodigitalAlteraComponent } from './view/certificadodigital-altera/certificadodigital-altera.component'; // ← ADICIONADO
import { CertificadodigitalListaComponent } from './view/certificadodigital-lista/certificadodigital-lista.component';
import { CertificadoDigitalConsultaComponent } from './view/certificadodigital-consulta/certificadodigital-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    CertificadodigitalListaComponent,
    InicioComponent,
    CertificadodigitalAlteraComponent,
    CertificadoDigitalConsultaComponent,
    CertificadodigitalInsereComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }