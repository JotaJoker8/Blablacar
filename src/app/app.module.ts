import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { VentanaConductoresComponent } from './components/ventana-conductores/ventana-conductores.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { PasajerosComponent } from './components/pasajeros/pasajeros.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    AltaUsuarioComponent,
    LoginUsuarioComponent,
    ConductoresComponent,
    VentanaConductoresComponent,
    HeaderComponent,
    PasajerosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
