import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
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
  suscripcionUsuario2!: Subscription;
  formGroup!: FormGroup;
  matcher = new ErrorStateMatcher();
  usuario: Usuario = new Usuario();
  viaje: Viaje = new Viaje();
  minDateViaje!: Date;
  maxDateViaje!: Date;

  constructor(private router: Router, private comunicacionService: ComunicacionService) {
    const currentYear = new Date().getFullYear();
    const mesActual = new Date().getMonth();
    const diaActual = new Date().getDate();
    this.minDateViaje = new Date(currentYear, mesActual, diaActual);
  }

  ngOnInit(): void {
    this.suscripcionUsuario2 = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
      console.log(this.usuario);
    })

    this.suscripcionUsuario = this.comunicacionService.observableSelectedViajes.subscribe(viajes => {
      this.usuario.viajes = viajes.filter(x => x.nombreUsuario == this.usuario.nombre);
    })

    this.formGroup = new FormGroup({
      viajeOrigen : new FormControl('', Validators.required),
      viajeDestino : new FormControl('', Validators.required),
      viajeFecha : new FormControl('', Validators.required),
    });  
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
    this.suscripcionUsuario2.unsubscribe();
  }

  guardarViaje(registroForm: any){
    if(registroForm.valid){
      if(this.usuario.rol == 'Conductor'){
        this.usuario.matricula = this.formGroup.get('usuarioMatricula')?.value;
        this.usuario.marca = this.formGroup.get('usuarioMarca')?.value;
        this.usuario.modelo = this.formGroup.get('usuarioModelo')?.value;
      }
      this.usuario.nombre = this.formGroup.get('usuarioNombre')?.value;
      this.usuario.id = this.formGroup.get('usuarioID')?.value;
      this.usuario.fechaNacimiento = this.formGroup.get('usuarioFechaNacimiento')?.value;
      this.comunicacionService.agregarUsuarios(this.usuario);
      this.router.navigateByUrl('');
    }else{
      alert('Formulario incorrecto');
    }
    console.log(this.usuario);
  }

  limpiar(){

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

}
