"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConductoresComponent = void 0;
var core_1 = require("@angular/core");
var usuario_1 = require("src/app/models/usuario");
var ventana_conductores_component_1 = require("../ventana-conductores/ventana-conductores.component");
var ConductoresComponent = /** @class */ (function () {
    function ConductoresComponent(comunicacionService, dialog) {
        this.comunicacionService = comunicacionService;
        this.dialog = dialog;
        this.usuario = new usuario_1.Usuario();
        this.displayedColumns = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precioPlaza', 'marca', 'modelo', 'plazas'];
        this.dataSource = this.usuario.viajes;
        this.clickedRows = new Set();
    }
    ConductoresComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(function (usuario) {
            _this.usuario = usuario;
        });
        this.suscripcionViaje = this.comunicacionService.observableSelectedViajes.subscribe(function (viajes) {
            _this.usuario.viajes = viajes.filter(function (x) { return x.conductor == _this.usuario.nombre; });
            _this.dataSource = [];
            for (var i = 0; i < _this.usuario.viajes.length; i++) {
                _this.usuario.viajes[i].marca = _this.usuario.marca;
                _this.usuario.viajes[i].modelo = _this.usuario.modelo;
                _this.dataSource.push(_this.usuario.viajes[i]);
            }
        });
    };
    ConductoresComponent.prototype.ngOnDestroy = function () {
        this.suscripcionUsuario.unsubscribe();
        this.suscripcionViaje.unsubscribe();
    };
    ConductoresComponent.prototype.agregarConductor = function () {
        this.dialog.open(ventana_conductores_component_1.VentanaConductoresComponent);
    };
    ConductoresComponent = __decorate([
        core_1.Component({
            selector: 'app-conductores',
            templateUrl: './conductores.component.html',
            styleUrls: ['./conductores.component.css']
        })
    ], ConductoresComponent);
    return ConductoresComponent;
}());
exports.ConductoresComponent = ConductoresComponent;
