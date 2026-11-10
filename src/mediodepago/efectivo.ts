import { MedioDePago } from "./mediodepago";

export class Efectivo extends MedioDePago {
    public constructor(tipoDePago:string = "efectivo") {
        super(tipoDePago);
    }

}