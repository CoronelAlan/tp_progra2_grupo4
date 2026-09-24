import { IEstrategiaBeneficio } from "./iestrategiabeneficio";

export class PrecioFijoCombo implements IEstrategiaBeneficio{
    private precioFijo: number;

    public constructor(precioFijo:number){
        this.precioFijo = precioFijo;
    }

    public calcular(precioBase: number):number{

    }
}