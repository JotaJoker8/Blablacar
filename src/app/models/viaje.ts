export class Viaje{
    constructor(viaje: Viaje | null) {
        if(viaje){
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
    public conductor!: string
    public origen!: string
    public destino!: string
    public fecha!: string
    public hora!: string
    public precioPlaza!: number
    public marca!: string
    public modelo!: string
    public plazas!: number
    public plazasReservadas: number = 0
}