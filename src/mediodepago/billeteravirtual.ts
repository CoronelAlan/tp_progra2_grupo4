import { MedioDePago } from "./mediodepago";

export class VilleteraVirtual extends MedioDePago {

    public constructor(tipoDePago:string = "billetera virtual") {
        super(tipoDePago);
    }

}