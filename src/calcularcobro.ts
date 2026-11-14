import { IEstrategiaDeDescuento } from "./estrategiadedescuento/iestrategiadescuento"
import { MedioDePago } from "./mediodepago/mediodepago";
import { Pedido } from "./pedido/pedido";
import { DiaDeLaSemana } from "./diasemana";
/**
 * Calcula el importe de un pedido y aplica un único descuento: el de mayor valor.
 */
export class CalculadoraCobro {
    private descuentos: IEstrategiaDeDescuento[];

    /**
     * Recibe las estrategias de descuento disponibles para el cobro.
     *
     * @param descuentos Estrategias disponibles.
     */
    public constructor(descuentos: IEstrategiaDeDescuento[]) {
        this.descuentos = descuentos;
    }

    

    /**
     * Calcula el importe del pedido, elige el mejor descuento y procesa el pago.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @param medioDePago Medio de pago utilizado.
     * @param diaActual Día de la operación.
     * @returns Importe total cobrado luego de aplicar el descuento y el medio de pago.
     */
    public calcularTotal(pedido: Pedido, medioDePago: MedioDePago, diaActual: DiaDeLaSemana): number {
        const totalBase = pedido.calcularPrecioTotal();
        const totalConDescuento = this.aplicarMejorDescuento(totalBase, diaActual, medioDePago);
        const totalFinal = this.procesarMedioDePago(medioDePago, totalConDescuento);

        return totalFinal;
    }

    /**
     * Incorpora otra estrategia de descuento a las disponibles.
     *
     * @param estrategia Estrategia de descuento a incorporar.
     */
    public agregarDescuento(estrategia: IEstrategiaDeDescuento): void {
        this.descuentos.push(estrategia);
    }


    /**
     * Compara los descuentos aplicables y resta solamente el mayor.
     *
     * @param totalBase Importe antes de descuentos.
     * @param diaActual Día de la operación.
     * @param medioDePago Medio de pago utilizado.
     * @returns Importe base menos el mayor descuento calculado.
     */
    private aplicarMejorDescuento(totalBase: number, diaActual: DiaDeLaSemana, medioDePago:MedioDePago): number {
        let mayorDescuento = 0;

        for (const estrategia of this.descuentos) {

            const montoDescuento = estrategia.calcularDescuento(totalBase, diaActual, medioDePago);
            
            if (montoDescuento > mayorDescuento) {
                mayorDescuento = montoDescuento;
            }
        }

        return totalBase - mayorDescuento;
    }


    /**
     * Delega en el medio de pago el procesamiento del importe final.
     *
     * @param medioDePago Medio de pago utilizado.
     * @param monto Importe del pago.
     * @returns Importe procesado por el medio de pago.
     */
    private procesarMedioDePago(medioDePago: MedioDePago, monto: number): number {
        return medioDePago.pagar(monto);
    }

}