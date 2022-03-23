import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { ComunicacionService } from 'src/app/services/comunicacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  suscripcionUsuario!: Subscription;
  usuario: Usuario = new Usuario();

  constructor(private router: Router, private comunicacionService: ComunicacionService) { }

  ngOnInit(): void {
    this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(usuario => {
      this.usuario = usuario;
    })
  }

  ngOnDestroy(): void {
    this.suscripcionUsuario.unsubscribe();
  }

  volver(){
    this.router.navigateByUrl('');
  }

}
