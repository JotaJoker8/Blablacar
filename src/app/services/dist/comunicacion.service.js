"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComunicacionService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var usuario_1 = require("../models/usuario");
var ComunicacionService = /** @class */ (function () {
    function ComunicacionService() {
        this.usuarios = [];
        this.viajes = [];
        this.selectedUsuarios = new rxjs_1.BehaviorSubject([]);
        this.selectedUsuario = new rxjs_1.BehaviorSubject(new usuario_1.Usuario);
        this.selectedViajes = new rxjs_1.BehaviorSubject([]);
        this.observableSelectedUsuarios = this.selectedUsuarios.asObservable();
        this.observableSelectedUsuario = this.selectedUsuario.asObservable();
        this.observableSelectedViajes = this.selectedViajes.asObservable();
    }
    ComunicacionService.prototype.agregarUsuarios = function (usuario) {
        this.usuarios.push(usuario);
        this.selectedUsuarios.next(this.usuarios);
    };
    ComunicacionService.prototype.usuarioConectado = function (usuario) {
        this.selectedUsuario.next(usuario);
    };
    ComunicacionService.prototype.agregarViajes = function (viaje) {
        this.viajes.push(viaje);
        this.selectedViajes.next(this.viajes);
    };
    ComunicacionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ComunicacionService);
    return ComunicacionService;
}());
exports.ComunicacionService = ComunicacionService;
