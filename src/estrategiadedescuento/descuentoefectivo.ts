import { IEstrategiaDeDescuento } from "./iestrategiadescuento";
import { MedioDePago } from "../mediodepago/mediodepago";
import { DiaDeLaSemana } from "../diasemana";
const PORCENTAJE_DEFECTO = 0;
const NUMBER = 100;
const ZERO = 0;
/**
 * Calcula un descuento porcentual cuando el pago es en efectivo.
 */
export class DescuentoEfectivo implements IEstrategiaDeDescuento {


    private porcentaje: number;

    /**
     * Configura el descuento de efectivo; sin porcentaje se usa cero.
     *
     * @param porcentaje Porcentaje de descuento.
     */
    public constructor(porcentaje?:number) {
        this.porcentaje = porcentaje ?? PORCENTAJE_DEFECTO;
    }

    /**
     * Devuelve el descuento si el medio de pago es efectivo.
     *
     * @param total Importe sobre el cual se calcula el descuento.
     * @param diaDeSemana Día que corresponde evaluar.
     * @param medioDePago Medio de pago utilizado.
     * @returns Importe del descuento, o cero si no se paga en efectivo.
     */
    public calcularDescuento(total: number, diaDeSemana: DiaDeLaSemana, medioDePago: MedioDePago): number {
        void diaDeSemana
        let resultado = ZERO
        if (medioDePago.getTipoDePago().toLowerCase() === "efectivo") {
            resultado = total * (this.porcentaje / NUMBER);
        }
        
        return resultado; 
    }
}