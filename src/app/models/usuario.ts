import { Rol } from "./enum"
import { Viaje } from "./viaje"

export class Usuario{
    public id!: number
	public nombre!: string
	public fechaNacimiento!: Date
	public saldo!: number
	public rol!: Rol
	public matricula!: string
	public marca!: string
	public modelo!: string
	public viajes!: Viaje[]
}