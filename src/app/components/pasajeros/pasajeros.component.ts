import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Viaje } from 'src/app/models/viaje';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-pasajeros',
  templateUrl: './pasajeros.component.html',
  styleUrls: ['./pasajeros.component.css']
})
export class PasajerosComponent implements OnInit {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  suscripcionUsuario!: Subscription;
  formGroup!: FormGroup;
  matcher = new ErrorStateMatcher();
  usuario: Usuario = new Usuario();
  viaje: Viaje = new Viaje();
  posiblesViajes: Viaje[] = [];
  minDateViaje!: Date;
  maxDateViaje!: Date;
  mostrarTabla: boolean = false;
  myClass: boolean = true;

  displayedColumns: string[] = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precio', 'plazas'];
  dataSource = this.usuario.viajes;
  clickedRows = new Set<Viaje>();

  constructor(private comunicacionService: ComunicacionService) {
    const currentYear = new Date().getFullYear();
    const mesActual = new Date().getMonth();
    const diaActual = new Date().getDate();
    this.minDateViaje = new Date(currentYear, mesActual, diaActual);
  }

  ngOnInit(): void {
    this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
    })

    this.suscripcionUsuario = this.comunicacionService.observableSelectedViajes.subscribe(viajes => {
      this.usuario.viajes = viajes;
      this.dataSource = this.usuario.viajes;
    })  
    
    this.formGroup = new FormGroup({
      viajeOrigen : new FormControl(''),
      viajeDestino : new FormControl(''),
      viajeFecha : new FormControl(''),
    });  
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
  }

  buscarViaje(){
    this.posiblesViajes = this.usuario.viajes.filter(x =>
      x.origen == (this.viaje.origen = this.formGroup.get('viajeOrigen')?.value) ||
      x.destino == (this.viaje.destino = this.formGroup.get('viajeDestino')?.value) ||
      +x.fecha == +(this.viaje.fecha = this.formGroup.get('viajeFecha')?.value)
    )
    this.dataSource = this.posiblesViajes;
    if(this.dataSource.length > 0){
      this.mostrarTabla = true;
    }else{
      alert('No se han encontrado viajes');
    }
  }

  limpiar(){
    this.ngOnInit();
    this.mostrarTabla = false;
  }

  seleccionarViaje(viaje: Viaje){
    this.myClass = !this.myClass;
    console.log(viaje);
  }

  reservarViaje(){

  }

  // getErrorOrigen(){
  //   if (this.formGroup.get('viajeOrigen')?.hasError('required')) {
  //     return 'Debes introducir un Origen';
  //   }
  //   return this.formGroup.get('viajeOrigen')?.hasError('pattern') ? 'Origen no válido' : '';
  // }

  // getErrorDestino(){
  //   if (this.formGroup.get('viajeDestino')?.hasError('required')) {
  //     return 'Debes introducir un Destino';
  //   }
  //   return this.formGroup.get('viajeDestino')?.hasError('pattern') ? 'Destino no válido' : '';
  // }

  // getErrorFecha(){
  //   if (this.formGroup.get('viajeFecha')?.hasError('required')) {
  //     return 'Debes introducir una fecha';
  //   }
  //   return this.formGroup.get('viajeFecha')?.hasError('pattern') ? 'Fecha no válida' : '';
  // }

}
