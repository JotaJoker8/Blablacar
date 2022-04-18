import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { ComunicacionService } from 'src/app/services/comunicacion.service';
import { MatDialog } from '@angular/material/dialog';
import { VentanaConductoresComponent } from '../ventana-conductores/ventana-conductores.component';
import { Viaje } from 'src/app/models/viaje';

@Component({
  selector: 'app-conductores',
  templateUrl: './conductores.component.html',
  styleUrls: ['./conductores.component.css']
})
export class ConductoresComponent implements OnInit {

  suscripcionUsuario!: Subscription;
  suscripcionViaje!: Subscription;
  usuario: Usuario = new Usuario();
  displayedColumns: string[] = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precioPlaza', 'marca', 'modelo', 'plazas'];
  dataSource = this.usuario.viajes;
  clickedRows = new Set<Usuario>();

  constructor(private comunicacionService: ComunicacionService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
    })

    this.suscripcionViaje = this.comunicacionService.observableSelectedViajes.subscribe(viajes => {
      this.usuario.viajes = viajes.filter(x => x.conductor == this.usuario.nombre);
      this.dataSource = [];
      for (let i = 0; i < this.usuario.viajes.length; i++) {
        this.usuario.viajes[i].marca = this.usuario.marca;
        this.usuario.viajes[i].modelo = this.usuario.modelo;
        this.dataSource.push(this.usuario.viajes[i]);
      }
    })
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
    this.suscripcionViaje.unsubscribe();
  }

  agregarConductor() {
    this.dialog.open(VentanaConductoresComponent);
  }

}
