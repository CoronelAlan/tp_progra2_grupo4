import {ITipoPedido} from "./ItipoPedido"
const COSTO_ADICIONAL_SALON = 0;

/**
 * Modalidad de pedido asociada a una mesa del salón.
 */
export class PedidoSalon implements ITipoPedido {
    private mesa : number;
    private costoAdicional : number;

    /**
     * Crea la modalidad salón indicando el número de mesa.
     *
     * @param mesa Número de mesa.
     */
    public constructor(mesa: number) {
        this.mesa = mesa;
        this.costoAdicional = COSTO_ADICIONAL_SALON;
    }

    /**
     * Devuelve la descripción del pedido con número de mesa.
     * @returns Descripción con el número de mesa.
     */
    public getDescripcion(): string {
        return `Pedido en el salon, mesa: ${this.mesa}`;
    }
    /**
     * Devuelve el costo adicional de salón (cero).
     * @returns Costo adicional de salón, cero.
     */
    public calcularCostoAdicional(): number {
        return this.costoAdicional;
    }

    /**
     * Devuelve el número de mesa.
     * @returns Número de mesa.
     */
    public getMesa() : number {
        return this.mesa;
    }
    
    
}