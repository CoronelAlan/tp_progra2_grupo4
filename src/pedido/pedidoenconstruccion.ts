import { IPlatoMenu } from "../iplatomenu/iplatomenu";
import { Pedido } from "./pedido";
import { IEstadoPedido } from "./iestadopedido";
import { PedidoConfirmado } from "./pedidoconfirmado";

export class PedidoEnConstruccion implements IEstadoPedido {

    public agregarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void {
        pedido.agregarPlatoAlHistorialYCocina(platoMenu);
    }


    public quitarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void {
        pedido.removerPlatoDelPedido(platoMenu);
    }

    public confirmar(pedido: Pedido): void {
        console.log(" Pedido confirmado, pasando a cocina ");
        pedido.cambiarEstadoPedido(new PedidoConfirmado());
    }

    public estaListoParaFacturar(pedido: Pedido): boolean {
         void pedido;
        return false;
    }
}