"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginUsuarioComponent = void 0;
var core_1 = require("@angular/core");
var usuario_1 = require("src/app/models/usuario");
var LoginUsuarioComponent = /** @class */ (function () {
    function LoginUsuarioComponent(router, comunicacionService) {
        this.router = router;
        this.comunicacionService = comunicacionService;
        this.mostrarNombreUsuario = false;
        this.mostrarUsuarios = true;
        this.usuarios = [];
        this.usuario = new usuario_1.Usuario();
    }
    LoginUsuarioComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.suscripcionUsuario = this.comunicacionService.observableSelectedUsuarios.subscribe(function (usuarios) {
            _this.usuarios = usuarios;
            for (var i = 0; i < usuarios.length; i++) {
                _this.usuario = usuarios[i];
                console.log(_this.usuario);
            }
        });
    };
    LoginUsuarioComponent.prototype.ngOnDestroy = function () {
        this.suscripcionUsuario.unsubscribe();
    };
    LoginUsuarioComponent.prototype.seleccionarJugador = function (event) {
        this.nombreUsuario = event.target.value;
        for (var i = 0; i < this.usuarios.length; i++) {
            if (this.usuarios[i].nombre == this.nombreUsuario) {
                this.comunicacionService.usuarioConectado(this.usuarios[i]);
                this.usuario = this.usuarios[i];
            }
        }
    };
    LoginUsuarioComponent.prototype.acceder = function () {
        this.mostrarNombreUsuario = true;
        this.mostrarUsuarios = false;
        if (this.usuario.rol == 'Conductor') {
            this.router.navigateByUrl('conductores');
        }
        if (this.usuario.rol == 'Pasajero') {
            this.router.navigateByUrl('pasajeros');
        }
    };
    LoginUsuarioComponent.prototype.volver = function () {
        this.router.navigateByUrl('');
    };
    LoginUsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-login-usuario',
            templateUrl: './login-usuario.component.html',
            styleUrls: ['./login-usuario.component.css']
        })
    ], LoginUsuarioComponent);
    return LoginUsuarioComponent;
}());
exports.LoginUsuarioComponent = LoginUsuarioComponent;
