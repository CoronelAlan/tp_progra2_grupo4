import {ItipoPedido} from "./ItipoPedido"
const COSTO_ADICIONAL_SALON = 0;

export class PedidoSalon implements ItipoPedido {
    private mesa : number;
    private costoAdicional : number;

    public constructor(mesa: number) {
        this.mesa = mesa;
        this.costoAdicional = COSTO_ADICIONAL_SALON;
    }

    public getDescripcion(): string {
        return `Pedido en el salon, mesa: ${this.mesa}`;
    }
    public calcularCostoAdicional(): number {
        return this.costoAdicional;
    }

    public getMesa() : number {
        return this.mesa;
    }
    
    
}