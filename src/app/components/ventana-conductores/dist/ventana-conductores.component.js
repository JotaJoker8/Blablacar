"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VentanaConductoresComponent = void 0;
var core_1 = require("@angular/core");
var viaje_1 = require("src/app/models/viaje");
var usuario_1 = require("src/app/models/usuario");
var forms_1 = require("@angular/forms");
var VentanaConductoresComponent = /** @class */ (function () {
    function VentanaConductoresComponent(dialog, comunicacionService) {
        this.dialog = dialog;
        this.comunicacionService = comunicacionService;
        this.viaje = new viaje_1.Viaje(null);
        this.usuario = new usuario_1.Usuario();
        var currentYear = new Date().getFullYear();
        var mesActual = new Date().getMonth();
        var diaActual = new Date().getDate();
        this.minDateViaje = new Date(currentYear, mesActual, diaActual);
    }
    VentanaConductoresComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.formGroup = new forms_1.FormGroup({
            viajeOrigen: new forms_1.FormControl('', forms_1.Validators.required),
            viajeDestino: new forms_1.FormControl('', forms_1.Validators.required),
            viajeFecha: new forms_1.FormControl('', forms_1.Validators.required),
            viajeHora: new forms_1.FormControl('', forms_1.Validators.pattern('[0-2]{1}[0-9]{1}:[0-5]{1}[0-9]{1}')),
            // viajePrecioPlaza : new FormControl('', Validators.pattern('[0-9]{2}')),
            viajePrecioPlaza: new forms_1.FormControl('', forms_1.Validators.required),
            viajePlazas: new forms_1.FormControl('', forms_1.Validators.pattern('[1-7]{1}'))
        });
        this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(function (usuario) {
            _this.usuario = usuario;
        });
    };
    VentanaConductoresComponent.prototype.ngOnDestroy = function () {
        this.suscripcionUsuario.unsubscribe();
    };
    VentanaConductoresComponent.prototype.agregarViaje = function () {
        var _a, _b, _c, _d, _e, _f;
        this.viaje.conductor = this.usuario.nombre;
        this.viaje.origen = (_a = this.formGroup.get('viajeOrigen')) === null || _a === void 0 ? void 0 : _a.value;
        this.viaje.destino = (_b = this.formGroup.get('viajeDestino')) === null || _b === void 0 ? void 0 : _b.value;
        this.viaje.fecha = (_c = this.formGroup.get('viajeFecha')) === null || _c === void 0 ? void 0 : _c.value;
        this.viaje.hora = (_d = this.formGroup.get('viajeHora')) === null || _d === void 0 ? void 0 : _d.value;
        this.viaje.precioPlaza = (_e = this.formGroup.get('viajePrecioPlaza')) === null || _e === void 0 ? void 0 : _e.value;
        this.viaje.plazas = (_f = this.formGroup.get('viajePlazas')) === null || _f === void 0 ? void 0 : _f.value;
        this.comunicacionService.agregarViajes(this.viaje);
        this.dialog.closeAll();
    };
    VentanaConductoresComponent.prototype.getErrorOrigen = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('viajeOrigen')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir un Origen';
        }
        return ((_b = this.formGroup.get('viajeOrigen')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Origen no válido' : '';
    };
    VentanaConductoresComponent.prototype.getErrorDestino = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('viajeDestino')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir un Destino';
        }
        return ((_b = this.formGroup.get('viajeDestino')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Destino no válido' : '';
    };
    VentanaConductoresComponent.prototype.getErrorFecha = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('viajeFecha')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir una fecha';
        }
        return ((_b = this.formGroup.get('viajeFecha')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Fecha no válida' : '';
    };
    VentanaConductoresComponent.prototype.getErrorHora = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('viajeHora')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir una hora';
        }
        return ((_b = this.formGroup.get('viajeHora')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Hora no válida' : '';
    };
    VentanaConductoresComponent.prototype.getErrorPrecio = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('viajePrecio')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir un Precio';
        }
        return ((_b = this.formGroup.get('viajePrecio')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Precio no válido' : '';
    };
    VentanaConductoresComponent.prototype.getErrorPlazas = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('viajePlazas')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir un Precio';
        }
        return ((_b = this.formGroup.get('viajePlazas')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Número de plazas no válido' : '';
    };
    VentanaConductoresComponent = __decorate([
        core_1.Component({
            selector: 'app-ventana-conductores',
            templateUrl: './ventana-conductores.component.html',
            styleUrls: ['./ventana-conductores.component.css']
        })
    ], VentanaConductoresComponent);
    return VentanaConductoresComponent;
}());
exports.VentanaConductoresComponent = VentanaConductoresComponent;
