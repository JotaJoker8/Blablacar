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
var VentanaViajesReservadosComponent = /** @class */ (function () {
    function VentanaViajesReservadosComponent(comunicacionService) {
        this.comunicacionService = comunicacionService;
        this.usuario = new usuario_1.Usuario();
        this.dataSource = [];
        this.displayedColumns = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precio', 'plazasReservadas'];
    }
    VentanaViajesReservadosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.suscripcionViaje = this.comunicacionService.observableSelectedViajes.subscribe(function (viajes) {
            _this.usuario.viajes = viajes;
            _this.dataSource = _this.usuario.viajes;
        });
    };
    VentanaViajesReservadosComponent.prototype.ngOnDestroy = function () {
        this.suscripcionViaje.unsubscribe();
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
