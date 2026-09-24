import { IEstrategiaBeneficio } from "./iestrategiabeneficio";
export class DescuentoPorcentual implements IEstrategiaBeneficio{
    private porcentaje: number;

    constructor(porcentaje:number){
        this.porcentaje = porcentaje;
    }

    public calcular(precioBase: number):number{
        
    }
}