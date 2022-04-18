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
  suscripcionViaje!: Subscription;
  usuario: Usuario = new Usuario();
  dataSource: Viaje[] = [];
  viajeReservado: Viaje = new Viaje(null);
  displayedColumns: string[] = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precioPlaza', 'plazasReservadas', 'borrarViaje'];
  mostrarBoton: boolean = true;

  constructor(private comunicacionService: ComunicacionService,) { }

  ngOnInit(): void {
    this.usuario.viajes = [];
    this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
    })

    this.suscripcionViaje = this.comunicacionService.observableSelectedViajes.subscribe(viajes => {
      this.dataSource = viajes;
    })  
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
    this.suscripcionViaje.unsubscribe();
  }

  borrarViaje(viaje: Viaje){
    for (let i = 0; i < this.usuario.viajes.length; i++) {
      if(this.usuario.viajes[i].origen == viaje.origen && 
        this.usuario.viajes[i].destino == viaje.destino &&
        this.usuario.viajes[i].fecha == viaje.fecha &&
        this.usuario.viajes[i].hora == viaje.hora){
        this.usuario.viajes[i].plazasReservadas--;
        this.usuario.saldo = +this.usuario.saldo + +this.usuario.viajes[i].precioPlaza;
        console.log(this.usuario.viajes[i].plazas);
        if(this.usuario.viajes[i].plazasReservadas == 0){
          this.usuario.viajes.splice(i, 1);
          this.mostrarBoton = false;
        }
      }
    }
    for (let i = 0; i < this.dataSource.length; i++) {
      if(this.dataSource[i].origen == viaje.origen && 
        this.dataSource[i].destino == viaje.destino &&
        this.dataSource[i].fecha == viaje.fecha &&
        this.dataSource[i].hora == viaje.hora){
          this.dataSource[i].plazas++;
        }
    }
  }
}
