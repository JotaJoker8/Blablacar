import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Viaje } from '../models/viaje';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

	usuarios: Usuario[] = [];
  viajes: Viaje[] = [];
  // Variable compartida que se encarga de guardar la info
  private selectedUsuarios!: BehaviorSubject<Usuario[]>;
  private selectedUsuario!: BehaviorSubject<Usuario>;
  private selectedViajes!: BehaviorSubject<Viaje[]>;
  private selectedViaje!: BehaviorSubject<Viaje>;
  // Variable que establece un mecanismo para que notifique cada vez que se modifica esa variable compartida
  public observableSelectedUsuarios!: Observable<Usuario[]>;
  public observableSelectedUsuario!: Observable<Usuario>;
  public observableSelectedViajes!: Observable<Viaje[]>;
  public observableSelectedViaje!: Observable<Viaje>;

  constructor() {
    this.selectedUsuarios = new BehaviorSubject<Usuario[]>([]);
    this.selectedUsuario = new BehaviorSubject<Usuario>(new Usuario);
    this.selectedViajes = new BehaviorSubject<Viaje[]>([]);
    this.selectedViaje = new BehaviorSubject<Viaje>(new Viaje);
    this.observableSelectedUsuarios = this.selectedUsuarios.asObservable();
    this.observableSelectedUsuario = this.selectedUsuario.asObservable();
    this.observableSelectedViajes = this.selectedViajes.asObservable();
    this.observableSelectedViaje = this.selectedViaje.asObservable();
  }

  agregarUsuarios(usuario: Usuario) {
    this.usuarios.push(usuario);
    this.selectedUsuarios.next(this.usuarios);
  }

  usuarioConectado(usuario: Usuario) {
    this.selectedUsuario.next(usuario);
  }

  agregarViajes(viaje: Viaje){
    this.viajes.push(viaje);
    this.selectedViajes.next(this.viajes);
  }
  
}
