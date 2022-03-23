import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AltaUsuarioComponent } from './components/alta-usuario/alta-usuario.component';
import { ConductoresComponent } from './components/conductores/conductores.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginUsuarioComponent } from './components/login-usuario/login-usuario.component';
import { PasajerosComponent } from './components/pasajeros/pasajeros.component';
import { VentanaConductoresComponent } from './components/ventana-conductores/ventana-conductores.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'altaUsuario', component: AltaUsuarioComponent},
  {path: 'loginUsuario', component: LoginUsuarioComponent},
  {path: 'conductores', component: ConductoresComponent},
  {path: 'ventanaConductores', component: VentanaConductoresComponent},
  {path: 'pasajeros', component: PasajerosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
