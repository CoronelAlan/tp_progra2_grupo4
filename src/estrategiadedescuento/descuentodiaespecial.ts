import { IEstrategiaDeDescuento } from "./iestrategiadescuento";
import { DiaDeLaSemana } from "../diasemana";
import { MedioDePago } from "../mediodepago/mediodepago";
const NUMBER = 100;
const ZERO = 0;
/**
 * Calcula un descuento porcentual si coincide el día configurado.
 */
export class DescuentoDiaEspecial implements IEstrategiaDeDescuento {
    private porcentaje:number;
    private diaSemana: DiaDeLaSemana;

    /**
     * Configura el porcentaje y el día al que se aplica.
     *
     * @param porcentaje Porcentaje de descuento.
     * @param diaSemana Día del beneficio.
     */
    public constructor(porcentaje: number, diaSemana: DiaDeLaSemana) {
        this.porcentaje = porcentaje;
        this.diaSemana = diaSemana;
    }

    /**
     * Devuelve el importe del descuento si corresponde al día indicado.
     *
     * @param total Importe sobre el cual se calcula el descuento.
     * @param diaDeDescuento Día que corresponde evaluar.
     * @param medioDePago Medio de pago utilizado.
     * @returns Importe del descuento, o cero si el día no corresponde.
     */
    public calcularDescuento(total: number, diaDeDescuento: DiaDeLaSemana, medioDePago: MedioDePago): number {
        void medioDePago;
        let resultado;
        if (this.diaSemana === diaDeDescuento) {
            resultado = total * (this.porcentaje/NUMBER);
        }
        else {
            resultado = ZERO
        }

        return resultado ;

    }
}