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

  suscripcionViaje!: Subscription;
  usuario: Usuario = new Usuario();
  dataSource: Viaje[] = [];
  displayedColumns: string[] = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precio', 'plazasReservadas'];

  constructor(private comunicacionService: ComunicacionService,) { }

  ngOnInit(): void {
    this.suscripcionViaje = this.comunicacionService.observableSelectedViajes.subscribe(viajes => {
      this.usuario.viajes = viajes;
      this.dataSource = this.usuario.viajes;
    })  
  }

  ngOnDestroy(): void {
    this.suscripcionViaje.unsubscribe();
  }

}
