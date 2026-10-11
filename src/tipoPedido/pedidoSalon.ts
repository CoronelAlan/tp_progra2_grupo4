import {ItipoPedido} from "./ItipoPedido"
const costoAdicionalSalon = 0;

export class PedidoSalon implements ItipoPedido {
    private mesa : number;
    private costoAdicional : number;

    constructor(mesa: number) {
        this.mesa = mesa;
        this.costoAdicional = costoAdicionalSalon;
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