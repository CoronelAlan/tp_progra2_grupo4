import { IEstrategiaDeDescuento } from "./iestrategiadescuento";
import { MedioDePago } from "../mediodepago/mediodepago";
import { DiaDeLaSemana } from "../diasemana";
const PORCENTAJE_DEFECTO = 0;
const NUMBER = 100;
const ZERO = 0;
export class DescuentoEfectivo implements IEstrategiaDeDescuento {


    private porcentaje: number;

    public constructor(porcentaje?:number) {
        this.porcentaje = porcentaje ?? PORCENTAJE_DEFECTO;
    }

    public calcularDescuento(total: number, diaDeSemana: DiaDeLaSemana, medioDePago: MedioDePago): number {
        void diaDeSemana
        let resultado = ZERO
        if (medioDePago.getTipoDePago().toLowerCase() === "efectivo") {
            resultado = total * (this.porcentaje / NUMBER);
        }
        
        return resultado; 
    }
}