"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PasajerosComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var usuario_1 = require("src/app/models/usuario");
var viaje_1 = require("src/app/models/viaje");
var ventana_viajes_reservados_component_1 = require("../ventana-viajes-reservados/ventana-viajes-reservados.component");
var PasajerosComponent = /** @class */ (function () {
    function PasajerosComponent(comunicacionService, dialog) {
        this.comunicacionService = comunicacionService;
        this.dialog = dialog;
        this.usuario = new usuario_1.Usuario();
        this.usuarios = [];
        this.viajeSeleccionado = new viaje_1.Viaje(null);
        this.displayedColumns = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precioPlaza', 'plazas'];
        this.dataSource = [];
        this.mostrarBotonReservar = false;
        this.mostrarBotonReservas = false;
        var currentYear = new Date().getFullYear();
        var mesActual = new Date().getMonth();
        var diaActual = new Date().getDate();
        this.minDateViaje = new Date(currentYear, mesActual, diaActual);
    }
    PasajerosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(function (usuario) {
            _this.usuario = usuario;
            if (!_this.usuario.viajes) {
                _this.usuario.viajes = [];
            }
            if (_this.usuario.viajes.length > 0) {
                _this.mostrarBotonReservas = true;
            }
        });
        this.suscripcionViaje = this.comunicacionService.observableSelectedViajes.subscribe(function (viajes) {
            _this.dataSource = viajes;
        });
        this.formGroup = new forms_1.FormGroup({
            viajeOrigen: new forms_1.FormControl(''),
            viajeDestino: new forms_1.FormControl(''),
            viajeFecha: new forms_1.FormControl('')
        });
    };
    PasajerosComponent.prototype.ngOnDestroy = function () {
        this.suscripcionUsuario.unsubscribe();
        this.suscripcionViaje.unsubscribe();
    };
    PasajerosComponent.prototype.buscarViaje = function () {
        var _this = this;
        this.mostrarBotonReservar = false;
        this.dataSource = this.dataSource.filter(function (x) {
            var _a, _b, _c;
            return x.origen == ((_a = _this.formGroup.get('viajeOrigen')) === null || _a === void 0 ? void 0 : _a.value) ||
                x.destino == ((_b = _this.formGroup.get('viajeDestino')) === null || _b === void 0 ? void 0 : _b.value) ||
                +x.fecha == +((_c = _this.formGroup.get('viajeFecha')) === null || _c === void 0 ? void 0 : _c.value);
        });
    };
    PasajerosComponent.prototype.limpiar = function () {
        this.ngOnInit();
        this.mostrarBotonReservar = false;
    };
    PasajerosComponent.prototype.seleccionarViaje = function (viaje) {
        this.viajeSeleccionado = viaje;
        this.mostrarBotonReservar = true;
    };
    PasajerosComponent.prototype.reservarViaje = function () {
        this.mostrarBotonReservas = true;
        var viajeSeleccionado = new viaje_1.Viaje(this.viajeSeleccionado);
        var isIncluded = false;
        if (this.viajeSeleccionado.plazas <= 0) {
            this.viajeSeleccionado.plazas = 0;
            alert('Viaje completo, no se pueden reservar más plazas');
        }
        else {
            this.viajeSeleccionado.plazas = this.viajeSeleccionado.plazas - 1;
            for (var i = 0; i < this.usuario.viajes.length; i++) {
                if (this.usuario.viajes[i].origen == this.viajeSeleccionado.origen &&
                    this.usuario.viajes[i].destino == this.viajeSeleccionado.destino &&
                    this.usuario.viajes[i].fecha == this.viajeSeleccionado.fecha &&
                    this.usuario.viajes[i].hora == this.viajeSeleccionado.hora) {
                    this.usuario.viajes[i].plazasReservadas++;
                    isIncluded = true;
                }
            }
            if (isIncluded == false) {
                this.usuario.viajes.push(viajeSeleccionado);
            }
            if (this.usuario.rol == 'Pasajero') {
                this.usuario.saldo = this.usuario.saldo - this.viajeSeleccionado.precioPlaza;
                for (var i = 0; i < this.usuarios.length; i++) {
                    var conductores = this.usuarios[i].nombre;
                    for (var j = 0; j < this.usuario.viajes.length; j++) {
                        if (conductores == this.usuario.viajes[j].conductor) {
                            this.usuario.saldoConductor = +this.usuario.saldoConductor + +viajeSeleccionado.precioPlaza;
                            console.log(this.usuario.saldoConductor);
                        }
                    }
                }
            }
            if (this.usuario.saldo < 0) {
                alert('El usuario no tiene suficiente saldo');
                this.viajeSeleccionado.plazas = +this.viajeSeleccionado.plazas + +1;
                this.usuario.saldo = +this.usuario.saldo + +this.viajeSeleccionado.precioPlaza;
                for (var i = 0; i < this.usuario.viajes.length; i++) {
                    if (this.usuario.viajes[i].origen == this.viajeSeleccionado.origen &&
                        this.usuario.viajes[i].destino == this.viajeSeleccionado.destino &&
                        this.usuario.viajes[i].fecha == this.viajeSeleccionado.fecha &&
                        this.usuario.viajes[i].hora == this.viajeSeleccionado.hora) {
                        this.usuario.viajes[i].plazasReservadas--;
                        isIncluded = true;
                    }
                }
            }
        }
    };
    PasajerosComponent.prototype.mostrarViajesReservados = function () {
        this.dialog.open(ventana_viajes_reservados_component_1.VentanaViajesReservadosComponent);
    };
    PasajerosComponent = __decorate([
        core_1.Component({
            selector: 'app-pasajeros',
            templateUrl: './pasajeros.component.html',
            styleUrls: ['./pasajeros.component.css']
        })
    ], PasajerosComponent);
    return PasajerosComponent;
}());
exports.PasajerosComponent = PasajerosComponent;
