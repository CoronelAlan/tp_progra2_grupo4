import { DiaDeLaSemana } from "../diasemana"
import { MedioDePago } from "../mediodepago/mediodepago"
export interface IEstrategiaDeDescuento {

    calcularDescuento(total: number, diaDeSemana:DiaDeLaSemana, medioDePago: MedioDePago):number
}