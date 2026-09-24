import { IEstrategiaDeDescuento } from "./iestrategiadescuento";
const PORCENTAJE = 100;
const NUMBER = 100;
export class DescuentoEfectivo implements IEstrategiaDeDescuento{


    private porcentaje: number;

    constructor(porcentaje?:number){
        this.porcentaje = porcentaje ?? PORCENTAJE;
    }

    public calcularDescuento(total: number): number {
        return total * (this.porcentaje/NUMBER);
    }
}