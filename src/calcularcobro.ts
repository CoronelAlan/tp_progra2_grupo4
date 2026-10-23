import { IEstrategiaDeDescuento } from "./estrategiadedescuento/iestrategiadescuento"
import { MedioDePago } from "./mediodepago/mediodepago";
import { Pedido } from "./pedido/pedido";
import { DiaDeLaSemana } from "./diasemana";
export class CalculadoraCobro {
    private descuentos: IEstrategiaDeDescuento[];

    public constructor(descuentos: IEstrategiaDeDescuento[]) {
        this.descuentos = descuentos;
    }

    

    public calcularTotal(pedido: Pedido, medioDePago: MedioDePago, diaActual: DiaDeLaSemana): number {
        const totalBase = pedido.calcularPrecioTotal();
        const totalConDescuento = this.aplicarMejorDescuento(totalBase, diaActual);
        const totalFinal = this.procesarMedioDePago(medioDePago, totalConDescuento);

        return totalFinal;
    }

    public agregarDescuento(estrategia: IEstrategiaDeDescuento): void {
        this.descuentos.push(estrategia);
    }


    private aplicarMejorDescuento(totalBase: number, diaActual: DiaDeLaSemana): number {
        let mayorDescuento = 0;

        for (const estrategia of this.descuentos) {

            const montoDescuento = estrategia.calcularDescuento(totalBase, diaActual);
            
            if (montoDescuento > mayorDescuento) {
                mayorDescuento = montoDescuento;
            }
        }

        return totalBase - mayorDescuento;
    }


    private procesarMedioDePago(medioDePago: MedioDePago, monto: number): number {
        return medioDePago.pagar(monto);
    }

}