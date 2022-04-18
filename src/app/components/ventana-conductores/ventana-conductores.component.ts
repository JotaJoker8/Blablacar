import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/viaje';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ventana-conductores',
  templateUrl: './ventana-conductores.component.html',
  styleUrls: ['./ventana-conductores.component.css']
})
export class VentanaConductoresComponent implements OnInit {

  formGroup!: FormGroup;
  suscripcionUsuario!: Subscription;
  viaje: Viaje = new Viaje(null);
  usuario: Usuario = new Usuario();
  minDateViaje!: Date;
  
  constructor(private dialog: MatDialog, private comunicacionService: ComunicacionService) {
    const currentYear = new Date().getFullYear();
    const mesActual = new Date().getMonth();
    const diaActual = new Date().getDate();
    this.minDateViaje = new Date(currentYear, mesActual, diaActual);
  } 

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      viajeOrigen : new FormControl('', Validators.required),
      viajeDestino: new FormControl('', Validators.required),
      viajeFecha : new FormControl('', Validators.required),
      viajeHora : new FormControl('', Validators.pattern('[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}')),
      // viajePrecioPlaza : new FormControl('', Validators.pattern('[0-9]{2}')),
      viajePrecioPlaza : new FormControl('', Validators.required),
      viajePlazas : new FormControl('', Validators.pattern('[1-7]{1}'))
    });
    
    this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
    })
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
  }

  agregarViaje(){
    this.viaje.conductor = this.usuario.nombre;
    this.viaje.origen = this.formGroup.get('viajeOrigen')?.value;
    this.viaje.destino = this.formGroup.get('viajeDestino')?.value;
    this.viaje.fecha = this.formGroup.get('viajeFecha')?.value;
    this.viaje.hora = this.formGroup.get('viajeHora')?.value;
    this.viaje.precioPlaza = this.formGroup.get('viajePrecioPlaza')?.value;
    this.viaje.plazas = this.formGroup.get('viajePlazas')?.value;
    this.comunicacionService.agregarViajes(this.viaje);
    this.dialog.closeAll();
  }

  getErrorOrigen(){
    if (this.formGroup.get('viajeOrigen')?.hasError('required')) {
      return 'Debes introducir un Origen';
    }
    return this.formGroup.get('viajeOrigen')?.hasError('pattern') ? 'Origen no válido' : '';
  }

  getErrorDestino(){
    if (this.formGroup.get('viajeDestino')?.hasError('required')) {
      return 'Debes introducir un Destino';
    }
    return this.formGroup.get('viajeDestino')?.hasError('pattern') ? 'Destino no válido' : '';
  }

  getErrorFecha(){
    if (this.formGroup.get('viajeFecha')?.hasError('required')) {
      return 'Debes introducir una fecha';
    }
    return this.formGroup.get('viajeFecha')?.hasError('pattern') ? 'Fecha no válida' : '';
  }

  getErrorHora(){
    if (this.formGroup.get('viajeHora')?.hasError('required')) {
      return 'Debes introducir una hora';
    }
    return this.formGroup.get('viajeHora')?.hasError('pattern') ? 'Hora no válida' : '';
  }

  getErrorPrecio(){
    if (this.formGroup.get('viajePrecio')?.hasError('required')) {
      return 'Debes introducir un Precio';
    }
    return this.formGroup.get('viajePrecio')?.hasError('pattern') ? 'Precio no válido' : '';
  }

  getErrorPlazas(){
    if (this.formGroup.get('viajePlazas')?.hasError('required')) {
      return 'Debes introducir un Precio';
    }
    return this.formGroup.get('viajePlazas')?.hasError('pattern') ? 'Número de plazas no válido' : '';
  }
}
