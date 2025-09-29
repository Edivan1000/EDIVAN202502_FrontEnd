import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { CertificadodigitalListaComponent } from './view/certificadodigital-lista/certificadodigital-lista.component';
import { InicioComponent } from './view/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    CertificadodigitalListaComponent,
    InicioComponent,
    CertificadodigitalListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
