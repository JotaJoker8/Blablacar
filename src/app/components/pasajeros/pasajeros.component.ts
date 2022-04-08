import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Viaje } from 'src/app/models/viaje';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { VentanaViajesReservadosComponent } from '../ventana-viajes-reservados/ventana-viajes-reservados.component';

@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styleUrls: ['./pasajeros.component.css']
})
export class PasajerosComponent implements OnInit {

  suscripcionUsuario!: Subscription;
  suscripcionViaje!: Subscription;
  formGroup!: FormGroup;
  usuario: Usuario = new Usuario();
  usuarios: Usuario[] = [];
  viajeSeleccionado: Viaje = new Viaje(null);
  minDateViaje!: Date;
  displayedColumns: string[] = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precio', 'plazas'];
  dataSource: Viaje[] = [];
  mostrarBotonReservar: boolean = false;
  mostrarBotonReservas: boolean = false;

  constructor(private comunicacionService: ComunicacionService,
    public dialog: MatDialog) {
    const currentYear = new Date().getFullYear();
    const mesActual = new Date().getMonth();
    const diaActual = new Date().getDate();
    this.minDateViaje = new Date(currentYear, mesActual, diaActual);
  }

  ngOnInit(): void {
    this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
      if(!this.usuario.viajes){
        this.usuario.viajes = [];
      }
      if(this.usuario.viajes.length > 0){
        this.mostrarBotonReservas = true;
      }
    })

    this.suscripcionViaje = this.comunicacionService.observableSelectedViajes.subscribe(viajes => {
      this.dataSource = viajes;
      console.log(this.dataSource);
    })  

    this.formGroup = new FormGroup({
      viajeOrigen : new FormControl(''),
      viajeDestino : new FormControl(''),
      viajeFecha : new FormControl(''),
    });  
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
    this.suscripcionViaje.unsubscribe();
  }

  buscarViaje(){
    this.dataSource = this.usuario.viajes.filter(x =>
      x.origen == (this.formGroup.get('viajeOrigen')?.value) ||
      x.destino == (this.formGroup.get('viajeDestino')?.value) ||
      +x.fecha == +(this.formGroup.get('viajeFecha')?.value)
    )
  }

  limpiar(){
    this.ngOnInit();
  }

  seleccionarViaje(viaje: Viaje){
    this.viajeSeleccionado = viaje;
    this.mostrarBotonReservar = true;
  }

  reservarViaje(){
    this.mostrarBotonReservas = true;
    let viajeSeleccionado = new Viaje(this.viajeSeleccionado);
    let isIncluded: boolean = false;
    if(this.viajeSeleccionado.plazas <= 0){
      this.viajeSeleccionado.plazas = 0;
      alert('Viaje completo, no se pueden reservar más plazas');
    }else{
      this.viajeSeleccionado.plazas = this.viajeSeleccionado.plazas - 1;
      for (let i = 0; i < this.usuario.viajes.length; i++) {
        if(this.usuario.viajes[i].origen == this.viajeSeleccionado.origen && 
          this.usuario.viajes[i].destino == this.viajeSeleccionado.destino &&
          this.usuario.viajes[i].fecha == this.viajeSeleccionado.fecha &&
          this.usuario.viajes[i].hora == this.viajeSeleccionado.hora){
          this.usuario.viajes[i].plazasReservadas++;
          isIncluded = true;
        }
      }
      if(isIncluded == false){
        this.usuario.viajes.push(viajeSeleccionado);
      }
    }
  }

  mostrarViajesReservados(){
    this.dialog.open(VentanaViajesReservadosComponent);
  }

}
