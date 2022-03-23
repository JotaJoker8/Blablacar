import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/enum';
import { Usuario } from 'src/app/models/usuario';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-alta-usuario',
  templateUrl: './alta-usuario.component.html',
  styleUrls: ['./alta-usuario.component.css']
})
export class AltaUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  tiposUsuarios: Rol[] = [Rol.CONDUCTOR, Rol.PASAJERO];
  datosConductor: boolean = false;

  constructor(private router: Router, private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {
  }

  guardarRespuestaTipoUsuario(event: any){
    this.usuario.rol = event.target.value;
    if(this.usuario.rol == 'Conductor'){
      this.datosConductor = true;
    }else{
      this.usuario.marca = '';
      this.usuario.matricula = '';
      this.usuario.modelo = '';
      this.datosConductor = false;
    }
  }
  
  guardarUsuario(){
    this.comunicacionService.agregarUsuarios(this.usuario);
    this.router.navigateByUrl('');
  }

  volver(){
    this.router.navigateByUrl('');
  }

}
