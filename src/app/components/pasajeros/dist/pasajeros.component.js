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
var core_2 = require("@angular/material/core");
var usuario_1 = require("src/app/models/usuario");
var viaje_1 = require("src/app/models/viaje");
var PasajerosComponent = /** @class */ (function () {
    function PasajerosComponent(comunicacionService) {
        this.comunicacionService = comunicacionService;
        this.matcher = new core_2.ErrorStateMatcher();
        this.usuario = new usuario_1.Usuario();
        this.viaje = new viaje_1.Viaje();
        this.posiblesViajes = [];
        this.mostrarTabla = false;
        this.myClass = true;
        this.displayedColumns = ['conductor', 'origen', 'destino', 'fecha', 'hora', 'precio', 'plazas'];
        this.dataSource = this.usuario.viajes;
        this.clickedRows = new Set();
        var currentYear = new Date().getFullYear();
        var mesActual = new Date().getMonth();
        var diaActual = new Date().getDate();
        this.minDateViaje = new Date(currentYear, mesActual, diaActual);
    }
    PasajerosComponent.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    PasajerosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuario.subscribe(function (usuario) {
            _this.usuario = usuario;
        });
        this.suscripcionUsuario = this.comunicacionService.observableSelectedViajes.subscribe(function (viajes) {
            _this.usuario.viajes = viajes;
            _this.dataSource = _this.usuario.viajes;
        });
        this.formGroup = new forms_1.FormGroup({
            viajeOrigen: new forms_1.FormControl(''),
            viajeDestino: new forms_1.FormControl(''),
            viajeFecha: new forms_1.FormControl('')
        });
    };
    PasajerosComponent.prototype.ngOnDestroy = function () {
        this.suscripcionUsuario.unsubscribe();
    };
    PasajerosComponent.prototype.buscarViaje = function () {
        var _this = this;
        this.posiblesViajes = this.usuario.viajes.filter(function (x) {
            var _a, _b, _c;
            return x.origen == (_this.viaje.origen = (_a = _this.formGroup.get('viajeOrigen')) === null || _a === void 0 ? void 0 : _a.value) ||
                x.destino == (_this.viaje.destino = (_b = _this.formGroup.get('viajeDestino')) === null || _b === void 0 ? void 0 : _b.value) ||
                +x.fecha == +(_this.viaje.fecha = (_c = _this.formGroup.get('viajeFecha')) === null || _c === void 0 ? void 0 : _c.value);
        });
        this.dataSource = this.posiblesViajes;
        if (this.dataSource.length > 0) {
            this.mostrarTabla = true;
        }
        else {
            alert('No se han encontrado viajes');
        }
    };
    PasajerosComponent.prototype.limpiar = function () {
        this.ngOnInit();
        this.mostrarTabla = false;
    };
    PasajerosComponent.prototype.seleccionarViaje = function (viaje) {
        this.myClass = !this.myClass;
        console.log(viaje);
    };
    PasajerosComponent.prototype.reservarViaje = function () {
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
