import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Viaje } from 'src/app/models/viaje';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-ventana-viajes-reservados',
  templateUrl: './ventana-viajes-reservados.component.html',
  styleUrls: ['./ventana-viajes-reservados.component.css']
})
export class VentanaViajesReservadosComponent implements OnInit {

  suscripcionUsuario!: Subscription;
  usuario: Usuario = new Usuario();
  viajeReservado: Viaje = new Viaje(null);
  displayedColumns: string[] = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precio', 'plazasReservadas', 'borrarViaje'];

  constructor(private comunicacionService: ComunicacionService,) { }

  ngOnInit(): void {
    this.usuario.viajes = [];
    this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
      for (let i = 0; i < usuario.viajes.length; i++) {
        this.viajeReservado = this.usuario.viajes[i];
      }
    })
    
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
  }

  borrarViaje(viajeReservado: Viaje){
    this.viajeReservado = viajeReservado;
    for (let i = 0; i < this.usuario.viajes.length; i++) {
      if(this.usuario.viajes[i].origen == this.viajeReservado.origen && 
        this.usuario.viajes[i].destino == this.viajeReservado.destino &&
        this.usuario.viajes[i].fecha == this.viajeReservado.fecha &&
        this.usuario.viajes[i].hora == this.viajeReservado.hora){
        this.usuario.viajes[i].plazasReservadas--;
      }
    }
   
    if(this.viajeReservado.plazasReservadas == 0){
      this.usuario.viajes = [];
    }
  }
}
