import { MedioDePago } from "./mediodepago";

const PORCENTAJE = 100;
const ZERO = 0;
const NUMBER_ONE = 1;

/**
 * Medio de pago que puede agregar un recargo porcentual.
 */
export class TarjetaDeCredito extends MedioDePago {
    private recargoPorcentaje: number;

   /**
    * Configura el recargo de tarjeta y el tipo de pago.
    *
    * @param recargoPorcentaje Porcentaje de recargo.
    * @param tipoDePago Nombre del medio de pago.
    */
   public constructor(recargoPorcentaje?: number, tipoDePago:string = "tarjeta de credito") {
        super(tipoDePago);
        this.recargoPorcentaje = recargoPorcentaje ?? ZERO; 
    }

    /**
     * Aplica el recargo porcentual si es mayor que cero.
     *
     * @param monto Importe del pago.
     * @returns Importe con recargo, si corresponde.
     */
    public pagar(monto: number): number {
        let resultado;
        if (this.recargoPorcentaje > ZERO) {
            resultado = monto * (NUMBER_ONE + this.recargoPorcentaje / PORCENTAJE);
        } else {
            resultado = super.pagar(monto)
        }

        return resultado;
    }
}
