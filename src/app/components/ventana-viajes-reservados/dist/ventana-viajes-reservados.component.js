"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VentanaViajesReservadosComponent = void 0;
var core_1 = require("@angular/core");
var usuario_1 = require("src/app/models/usuario");
var viaje_1 = require("src/app/models/viaje");
var VentanaViajesReservadosComponent = /** @class */ (function () {
    function VentanaViajesReservadosComponent(comunicacionService) {
        this.comunicacionService = comunicacionService;
        this.usuario = new usuario_1.Usuario();
        this.dataSource = [];
        this.viajeReservado = new viaje_1.Viaje(null);
        this.displayedColumns = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precioPlaza', 'plazasReservadas', 'borrarViaje'];
        this.mostrarBoton = true;
    }
    VentanaViajesReservadosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usuario.viajes = [];
        this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(function (usuario) {
            _this.usuario = usuario;
        });
        this.suscripcionViaje = this.comunicacionService.observableSelectedViajes.subscribe(function (viajes) {
            _this.dataSource = viajes;
        });
    };
    VentanaViajesReservadosComponent.prototype.ngOnDestroy = function () {
        this.suscripcionUsuario.unsubscribe();
        this.suscripcionViaje.unsubscribe();
    };
    VentanaViajesReservadosComponent.prototype.borrarViaje = function (viaje) {
        for (var i = 0; i < this.usuario.viajes.length; i++) {
            if (this.usuario.viajes[i].origen == viaje.origen &&
                this.usuario.viajes[i].destino == viaje.destino &&
                this.usuario.viajes[i].fecha == viaje.fecha &&
                this.usuario.viajes[i].hora == viaje.hora) {
                this.usuario.viajes[i].plazasReservadas--;
                this.usuario.saldo = +this.usuario.saldo + +this.usuario.viajes[i].precioPlaza;
                console.log(this.usuario.viajes[i].plazas);
                if (this.usuario.viajes[i].plazasReservadas == 0) {
                    this.usuario.viajes.splice(i, 1);
                    this.mostrarBoton = false;
                }
            }
        }
        for (var i = 0; i < this.dataSource.length; i++) {
            if (this.dataSource[i].origen == viaje.origen &&
                this.dataSource[i].destino == viaje.destino &&
                this.dataSource[i].fecha == viaje.fecha &&
                this.dataSource[i].hora == viaje.hora) {
                this.dataSource[i].plazas++;
            }
        }
    };
    VentanaViajesReservadosComponent = __decorate([
        core_1.Component({
            selector: 'app-ventana-viajes-reservados',
            templateUrl: './ventana-viajes-reservados.component.html',
            styleUrls: ['./ventana-viajes-reservados.component.css']
        })
    ], VentanaViajesReservadosComponent);
    return VentanaViajesReservadosComponent;
}());
exports.VentanaViajesReservadosComponent = VentanaViajesReservadosComponent;
