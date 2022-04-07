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
        this.viajeReservado = new viaje_1.Viaje(null);
        this.displayedColumns = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precio', 'plazasReservadas', 'borrarViaje'];
    }
    VentanaViajesReservadosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.usuario.viajes = [];
        this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(function (usuario) {
            _this.usuario = usuario;
            for (var i = 0; i < usuario.viajes.length; i++) {
                _this.viajeReservado = _this.usuario.viajes[i];
            }
        });
    };
    VentanaViajesReservadosComponent.prototype.ngOnDestroy = function () {
        this.suscripcionUsuario.unsubscribe();
    };
    VentanaViajesReservadosComponent.prototype.borrarViaje = function (viajeReservado) {
        this.viajeReservado = viajeReservado;
        for (var i = 0; i < this.usuario.viajes.length; i++) {
            if (this.usuario.viajes[i].origen == this.viajeReservado.origen &&
                this.usuario.viajes[i].destino == this.viajeReservado.destino &&
                this.usuario.viajes[i].fecha == this.viajeReservado.fecha &&
                this.usuario.viajes[i].hora == this.viajeReservado.hora) {
                this.usuario.viajes[i].plazasReservadas--;
            }
        }
        if (this.viajeReservado.plazasReservadas == 0) {
            this.usuario.viajes = [];
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
