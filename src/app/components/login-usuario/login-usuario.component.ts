import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-login-usuario',
  templateUrl: './login-usuario.component.html',
  styleUrls: ['./login-usuario.component.css']
})
export class LoginUsuarioComponent implements OnInit {

  suscripcionUsuario!: Subscription;
  mostrarNombreUsuario: boolean = false;
  mostrarUsuarios: boolean = true;
  nombreUsuario!: string;
  usuarios: Usuario[] = [];
  usuario: Usuario = new Usuario();

  constructor(private router: Router, private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {
    this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuarios.subscribe(usuarios => {
      this.usuarios = usuarios;
      for (let i = 0; i < usuarios.length; i++) {
        this.usuario = usuarios[i];
      }
    })
  }  

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
  }

  seleccionarJugador(event: any){
    this.nombreUsuario = event.target.value;
    for (let i = 0; i < this.usuarios.length; i++) {
      if(this.usuarios[i].nombre == this.nombreUsuario){
        this.comunicacionService.usuarioConectado(this.usuarios[i]);
        this.usuario = this.usuarios[i];
      }
    }
  }

  acceder(){
    this.mostrarNombreUsuario = true;
    this.mostrarUsuarios = false;
    if(this.usuario.rol == 'Conductor'){
      this.router.navigateByUrl('conductores');
    }
    if(this.usuario.rol == 'Pasajero'){
      this.router.navigateByUrl('pasajeros');
    }
  }

  volver(){
    this.router.navigateByUrl('');
  }

}
