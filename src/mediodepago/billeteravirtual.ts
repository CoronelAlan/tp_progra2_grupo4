import { MedioDePago } from "./mediodepago";

/**
 * Medio de pago identificado como billetera virtual.
 */
export class VilleteraVirtual extends MedioDePago {

    /**
     * Crea un medio de pago de billetera virtual.
     *
     * @param tipoDePago Nombre del medio de pago.
     */
    public constructor(tipoDePago:string = "billetera virtual") {
        super(tipoDePago);
    }

}