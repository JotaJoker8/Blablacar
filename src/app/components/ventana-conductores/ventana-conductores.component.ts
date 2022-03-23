import { Component, OnInit } from '@angular/core';
import { Viaje } from 'src/app/models/viaje';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { MatDialog } from '@angular/material/dialog';
import { Usuario } from 'src/app/models/usuario';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ventana-conductores',
  templateUrl: './ventana-conductores.component.html',
  styleUrls: ['./ventana-conductores.component.css']
})
export class VentanaConductoresComponent implements OnInit {

  suscripcionUsuario!: Subscription;
  viaje: Viaje = new Viaje();
  usuario: Usuario = new Usuario();
  
  constructor(private dialog: MatDialog, private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {
    this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
    })
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
  }

  agregarViaje(){
    this.viaje.nombreUsuario = this.usuario.nombre;
    this.comunicacionService.agregarViajes(this.viaje);
    this.dialog.closeAll();
  }

}
