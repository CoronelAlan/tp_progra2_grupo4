import { DiaDeLaSemana } from "../diasemana"
export interface IEstrategiaDeDescuento {

    calcularDescuento(total: number, diaDeSemana:DiaDeLaSemana):number
}