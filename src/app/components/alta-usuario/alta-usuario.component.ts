import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/enum';
import { Usuario } from 'src/app/models/usuario';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  
  formGroup!: FormGroup;
  matcher = new ErrorStateMatcher();
  usuario: Usuario = new Usuario();
  tiposUsuarios: Rol[] = [Rol.CONDUCTOR, Rol.PASAJERO];
  datosConductor: boolean = false;
  calendarioPasajero: boolean = false;
  calendarioConductor: boolean = true;
  minDateConductor!: Date;
  maxDateConductor!: Date;
  minDatePasajero!: Date;
  maxDatePasajero!: Date;

  constructor(private router: Router, private comunicacionService: ComunicacionService) {
    const currentYear = new Date().getFullYear();
    const diaActual = new Date().getDate();
    const mesActual = new Date().getMonth();
    this.minDateConductor = new Date(currentYear - 90, 0, 1);
    this.maxDateConductor = new Date(currentYear - 18, mesActual, diaActual);
    this.maxDatePasajero = new Date(currentYear, mesActual, diaActual);
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      usuarioNombre : new FormControl('', Validators.pattern('[a-zA-Z0-9_-]{5,15}')),
      usuarioID : new FormControl('', Validators.pattern('[a-zA-Z0-9_-]{4}')),
      usuarioFechaNacimiento : new FormControl('', Validators.required),
      usuarioRol: new FormControl('', Validators.required),
      usuarioMatricula : new FormControl('', Validators.pattern('[0-9]{4}[A-Z]{3}')),
      usuarioMarca : new FormControl('', Validators.pattern('[a-zA-Z]{4,10}')),
      usuarioModelo : new FormControl('', Validators.pattern('[a-zA-Z0-9]{2,10}'))
    });
  }

  guardarRespuestaTipoUsuario(){
    this.usuario.rol = this.formGroup.get('usuarioRol')?.value;
    if(this.usuario.rol == 'Conductor'){
      this.datosConductor = true;
      this.calendarioConductor = true;
      this.calendarioPasajero = false;
    }else{
      this.calendarioConductor = false;
      this.calendarioPasajero = true;
      this.usuario.marca = '';
      this.usuario.matricula = '';
      this.usuario.modelo = '';
      this.datosConductor = false;
    }
  }
  
  guardarUsuario(registroForm: any){
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
  }

  volver(){
    this.router.navigateByUrl('');
  }

  getErrorNombre(){
    if (this.formGroup.get('usuarioNombre')?.hasError('required')) {
      return 'Debes introducir un Nombre';
    }
    return this.formGroup.get('usuarioNombre')?.hasError('pattern') ? 'Nombre no válido' : '';
  }

  getErrorID(){
    if (this.formGroup.get('usuarioID')?.hasError('required')) {
      return 'Debes introducir un ID';
    }
    return this.formGroup.get('usuarioID')?.hasError('pattern') ? 'ID no válido' : '';
  }

  getErrorFecha(){
    if (this.formGroup.get('usuarioFechaNacimiento')?.hasError('required')) {
      return 'Debes introducir una fecha';
    }
    return this.formGroup.get('usuarioFechaNacimiento')?.hasError('pattern') ? 'Fecha no válida' : '';
  }

  getErrorRol(){
    if (this.formGroup.get('usuarioRol')?.hasError('required')) {
      return 'Debes seleccionar un rol';
    }
    return this.formGroup.get('usuarioRol')?.hasError('pattern') ? 'Rol no válido' : '';
  }

  getErrorMatricula(){
    if (this.formGroup.get('usuarioMatricula')?.hasError('required')) {
      return 'Debes introducir una Matrícula';
    }
    return this.formGroup.get('usuarioMatricula')?.hasError('pattern') ? 'Matrícula no válida' : '';
  }

  getErrorMarca(){
    if (this.formGroup.get('usuarioMarca')?.hasError('required')) {
      return 'Debes introducir una Marca';
    }
    return this.formGroup.get('usuarioMarca')?.hasError('pattern') ? 'Marca no válida' : '';
  }

  getErrorModelo(){
    if (this.formGroup.get('usuarioModelo')?.hasError('required')) {
      return 'Debes introducir un Modelo';
    }
    return this.formGroup.get('usuarioModelo')?.hasError('pattern') ? 'Modelo no válido' : '';
  }

}
