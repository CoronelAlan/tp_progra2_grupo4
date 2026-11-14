import { DiaDeLaSemana } from "../diasemana"
import { MedioDePago } from "../mediodepago/mediodepago"
/**
 * Contrato para calcular el importe de un descuento de cobro.
 */
export interface IEstrategiaDeDescuento {

    /**
     * Calcula el importe a descontar según total, día y medio de pago.
     *
     * @param total Importe sobre el cual se calcula el descuento.
     * @param diaDeSemana Día que corresponde evaluar.
     * @param medioDePago Medio de pago utilizado.
     * @returns Monto a descontar del total.
     */
    calcularDescuento(total: number, diaDeSemana:DiaDeLaSemana, medioDePago: MedioDePago):number
}