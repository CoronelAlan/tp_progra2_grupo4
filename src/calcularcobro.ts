import { IEstrategiaDeDescuento } from "./estrategiadedescuento/iestrategiadescuento"
import { MedioDePago } from "./mediodepago/mediodepago";
export class CalculadoraCobro {
    private descuentos: IEstrategiaDeDescuento[];

    constructor(descuentos: IEstrategiaDeDescuento[]){
        this.descuentos = descuentos;
    }

    public calcularTotal(pedido: Pedido, medio:MedioDePago):number{
        
    }
}