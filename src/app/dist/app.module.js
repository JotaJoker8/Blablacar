"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var inicio_component_1 = require("./components/inicio/inicio.component");
var forms_1 = require("@angular/forms");
var alta_usuario_component_1 = require("./components/alta-usuario/alta-usuario.component");
var login_usuario_component_1 = require("./components/login-usuario/login-usuario.component");
var conductores_component_1 = require("./components/conductores/conductores.component");
var ventana_conductores_component_1 = require("./components/ventana-conductores/ventana-conductores.component");
var header_component_1 = require("./components/header/header.component");
var animations_1 = require("@angular/platform-browser/animations");
var dialog_1 = require("@angular/material/dialog");
var input_1 = require("@angular/material/input");
var pasajeros_component_1 = require("./components/pasajeros/pasajeros.component");
var radio_1 = require("@angular/material/radio");
var datepicker_1 = require("@angular/material/datepicker");
var core_2 = require("@angular/material/core");
var table_1 = require("@angular/material/table");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                inicio_component_1.InicioComponent,
                alta_usuario_component_1.AltaUsuarioComponent,
                login_usuario_component_1.LoginUsuarioComponent,
                conductores_component_1.ConductoresComponent,
                ventana_conductores_component_1.VentanaConductoresComponent,
                header_component_1.HeaderComponent,
                pasajeros_component_1.PasajerosComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                forms_1.FormsModule,
                animations_1.BrowserAnimationsModule,
                dialog_1.MatDialogModule,
                input_1.MatInputModule,
                radio_1.MatRadioModule,
                datepicker_1.MatDatepickerModule,
                forms_1.ReactiveFormsModule,
                core_2.MatNativeDateModule,
                table_1.MatTableModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
