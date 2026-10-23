import { IPlatoMenu } from "../iplatomenu/iplatomenu";
import { Pedido } from "./pedido";
import { IEstadoPedido } from "./iestadopedido";

export class PedidoConfirmado implements IEstadoPedido {

    public agregarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void {
        void pedido;
        void platoMenu;

        throw new Error("No se puede modificar un pedido confirmado.");
    }

    public quitarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void {
         void pedido;
        void platoMenu;
        throw new Error("No se puede modificar un pedido confirmado.");
    }

    public confirmar(pedido: Pedido): void {
         void pedido;
        throw new Error("El pedido ya se encuentra confirmado.");
    }

    public estaListoParaFacturar(pedido: Pedido): boolean {
        return pedido.verificarPlatosListosParaFacturar();
    }
}