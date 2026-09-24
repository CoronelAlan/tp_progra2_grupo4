import {ItipoPedido} from "./ItipoPedido"

export class PedidoSalon implements ItipoPedido {
    getDescripcion(): string {
        throw new Error("Method not implemented.");
    }
    getCostoEnvio(): number {
        throw new Error("Method not implemented.");
    }
    
}