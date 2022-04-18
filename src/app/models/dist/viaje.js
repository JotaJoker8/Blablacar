"use strict";
exports.__esModule = true;
exports.Viaje = void 0;
var Viaje = /** @class */ (function () {
    function Viaje(viaje) {
        this.plazasReservadas = 0;
        if (viaje) {
            this.conductor = viaje.conductor;
            this.origen = viaje.origen;
            this.destino = viaje.destino;
            this.fecha = viaje.fecha;
            this.hora = viaje.hora;
            this.precioPlaza = viaje.precioPlaza;
            this.marca = viaje.marca;
            this.modelo = viaje.modelo;
            this.plazas = viaje.plazas;
            this.plazasReservadas = 1;
        }
    }
    return Viaje;
}());
exports.Viaje = Viaje;
