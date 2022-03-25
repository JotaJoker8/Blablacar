import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { MatDialog } from '@angular/material/dialog';
import { VentanaConductoresComponent } from '../ventana-conductores/ventana-conductores.component';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {

  suscripcionUsuario!: Subscription;
  suscripcionUsuario2!: Subscription;
  usuario: Usuario = new Usuario();

  constructor(private comunicacionService: ComunicacionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.suscripcionUsuario2 = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
    })

    this.suscripcionUsuario = this.comunicacionService.observableSelectedViajes.subscribe(viajes => {
      this.usuario.viajes = viajes.filter(x => x.nombreUsuario == this.usuario.nombre);
    })
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
    this.suscripcionUsuario2.unsubscribe();
  }

  agregarConductor() {
    this.dialog.open(VentanaConductoresComponent);
  }

}
