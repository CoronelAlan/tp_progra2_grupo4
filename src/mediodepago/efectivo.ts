import { MedioDePago } from "./mediodepago";

/**
 * Medio de pago identificado como efectivo.
 */
export class Efectivo extends MedioDePago {
    /**
     * Crea un medio de pago en efectivo.
     *
     * @param tipoDePago Nombre del medio de pago.
     */
    public constructor(tipoDePago:string = "efectivo") {
        super(tipoDePago);
    }

}