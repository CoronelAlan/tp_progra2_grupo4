import { IEstrategiaDeDescuento } from "./estrategiadedescuento/iestrategiadescuento"
import { MedioDePago } from "./mediodepago/mediodepago";
import { Pedido } from "./pedido/pedido";
export class CalculadoraCobro {
    private descuentos: IEstrategiaDeDescuento[];

    public constructor(descuentos: IEstrategiaDeDescuento[]) {
        this.descuentos = descuentos;
    }

    

    public calcularTotal(pedido: Pedido, medio:MedioDePago):number {
        
        
    }
}