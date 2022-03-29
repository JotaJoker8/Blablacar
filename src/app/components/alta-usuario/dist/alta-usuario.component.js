"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AltaUsuarioComponent = void 0;
var core_1 = require("@angular/core");
var enum_1 = require("src/app/models/enum");
var usuario_1 = require("src/app/models/usuario");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/material/core");
var AltaUsuarioComponent = /** @class */ (function () {
    function AltaUsuarioComponent(router, comunicacionService) {
        this.router = router;
        this.comunicacionService = comunicacionService;
        this.matcher = new core_2.ErrorStateMatcher();
        this.usuario = new usuario_1.Usuario();
        this.tiposUsuarios = [enum_1.Rol.CONDUCTOR, enum_1.Rol.PASAJERO];
        this.datosConductor = false;
        this.calendarioPasajero = false;
        this.calendarioConductor = true;
        var currentYear = new Date().getFullYear();
        var diaActual = new Date().getDate();
        var mesActual = new Date().getMonth();
        this.minDateConductor = new Date(currentYear - 90, 0, 1);
        this.maxDateConductor = new Date(currentYear - 18, mesActual, diaActual);
        this.maxDatePasajero = new Date(currentYear, mesActual, diaActual);
    }
    AltaUsuarioComponent.prototype.isErrorState = function (control, form) {
        var isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    };
    AltaUsuarioComponent.prototype.ngOnInit = function () {
        this.formGroup = new forms_1.FormGroup({
            usuarioNombre: new forms_1.FormControl('', forms_1.Validators.pattern('[a-zA-Z0-9_-]{5,15}')),
            usuarioID: new forms_1.FormControl('', forms_1.Validators.pattern('[a-zA-Z0-9_-]{4}')),
            usuarioFechaNacimiento: new forms_1.FormControl('', forms_1.Validators.required),
            usuarioRol: new forms_1.FormControl('', forms_1.Validators.required),
            usuarioMatricula: new forms_1.FormControl('', forms_1.Validators.pattern('[0-9]{4}[A-Z]{3}')),
            usuarioMarca: new forms_1.FormControl('', forms_1.Validators.pattern('[a-zA-Z]{4,10}')),
            usuarioModelo: new forms_1.FormControl('', forms_1.Validators.pattern('[a-zA-Z0-9]{2,10}'))
        });
    };
    AltaUsuarioComponent.prototype.guardarRespuestaTipoUsuario = function () {
        var _a;
        this.usuario.rol = (_a = this.formGroup.get('usuarioRol')) === null || _a === void 0 ? void 0 : _a.value;
        if (this.usuario.rol == 'Conductor') {
            this.datosConductor = true;
            this.calendarioConductor = true;
            this.calendarioPasajero = false;
        }
        else {
            this.calendarioConductor = false;
            this.calendarioPasajero = true;
            this.usuario.marca = '';
            this.usuario.matricula = '';
            this.usuario.modelo = '';
            this.datosConductor = false;
        }
    };
    AltaUsuarioComponent.prototype.guardarUsuario = function (registroForm) {
        var _a, _b, _c, _d, _e, _f;
        if (registroForm.valid) {
            if (this.usuario.rol == 'Conductor') {
                this.usuario.matricula = (_a = this.formGroup.get('usuarioMatricula')) === null || _a === void 0 ? void 0 : _a.value;
                this.usuario.marca = (_b = this.formGroup.get('usuarioMarca')) === null || _b === void 0 ? void 0 : _b.value;
                this.usuario.modelo = (_c = this.formGroup.get('usuarioModelo')) === null || _c === void 0 ? void 0 : _c.value;
            }
            this.usuario.nombre = (_d = this.formGroup.get('usuarioNombre')) === null || _d === void 0 ? void 0 : _d.value;
            this.usuario.id = (_e = this.formGroup.get('usuarioID')) === null || _e === void 0 ? void 0 : _e.value;
            this.usuario.fechaNacimiento = (_f = this.formGroup.get('usuarioFechaNacimiento')) === null || _f === void 0 ? void 0 : _f.value;
            this.comunicacionService.agregarUsuarios(this.usuario);
            this.router.navigateByUrl('');
        }
        else {
            alert('Formulario incorrecto');
        }
    };
    AltaUsuarioComponent.prototype.volver = function () {
        this.router.navigateByUrl('');
    };
    AltaUsuarioComponent.prototype.getErrorNombre = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('usuarioNombre')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir un Nombre';
        }
        return ((_b = this.formGroup.get('usuarioNombre')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Nombre no válido' : '';
    };
    AltaUsuarioComponent.prototype.getErrorID = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('usuarioID')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir un ID';
        }
        return ((_b = this.formGroup.get('usuarioID')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'ID no válido' : '';
    };
    AltaUsuarioComponent.prototype.getErrorFecha = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('usuarioFechaNacimiento')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir una fecha';
        }
        return ((_b = this.formGroup.get('usuarioFechaNacimiento')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Fecha no válida' : '';
    };
    AltaUsuarioComponent.prototype.getErrorRol = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('usuarioRol')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes seleccionar un rol';
        }
        return ((_b = this.formGroup.get('usuarioRol')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Rol no válido' : '';
    };
    AltaUsuarioComponent.prototype.getErrorMatricula = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('usuarioMatricula')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir una Matrícula';
        }
        return ((_b = this.formGroup.get('usuarioMatricula')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Matrícula no válida' : '';
    };
    AltaUsuarioComponent.prototype.getErrorMarca = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('usuarioMarca')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir una Marca';
        }
        return ((_b = this.formGroup.get('usuarioMarca')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Marca no válida' : '';
    };
    AltaUsuarioComponent.prototype.getErrorModelo = function () {
        var _a, _b;
        if ((_a = this.formGroup.get('usuarioModelo')) === null || _a === void 0 ? void 0 : _a.hasError('required')) {
            return 'Debes introducir un Modelo';
        }
        return ((_b = this.formGroup.get('usuarioModelo')) === null || _b === void 0 ? void 0 : _b.hasError('pattern')) ? 'Modelo no válido' : '';
    };
    AltaUsuarioComponent = __decorate([
        core_1.Component({
            selector: 'app-alta-usuario',
            templateUrl: './alta-usuario.component.html',
            styleUrls: ['./alta-usuario.component.css']
        })
    ], AltaUsuarioComponent);
    return AltaUsuarioComponent;
}());
exports.AltaUsuarioComponent = AltaUsuarioComponent;
