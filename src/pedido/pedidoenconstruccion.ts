import { IPlatoMenu } from "../iplatomenu/iplatomenu";
import { Pedido } from "./pedido";
import { IEstadoPedido } from "./iestadopedido";
import { PedidoConfirmado } from "./pedidoconfirmado";

/**
 * Estado que permite modificar el pedido y confirmarlo.
 */
export class PedidoEnConstruccion implements IEstadoPedido {

    /**
     * Delega el agregado y registro del historial al pedido.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @param platoMenu Plato o combo del menú.
     */
    public agregarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void {
        pedido.agregarPlatoAlHistorialYCocina(platoMenu);
    }

    /**
     * Delega la eliminación del ítem al pedido.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @param platoMenu Plato o combo del menú.
     */
    public quitarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void {
        pedido.removerPlatoDelPedido(platoMenu);
    }

    /**
     * Autoriza confirmar mientras el pedido está en construcción.
     */
    public validarConfirmacion(): void {
    return;
    }

    /**
     * Autoriza deshacer mientras el pedido está en construcción.
     */
    public validarDeshacer(): void {
    return;
    }   

    /**
     * Cambia el estado del pedido a confirmado.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     */
    public confirmar(pedido: Pedido): void {
        console.log(" Pedido confirmado, pasando a cocina ");
        pedido.cambiarEstadoPedido(new PedidoConfirmado());
    }

    /**
     * Impide facturar un pedido sin confirmar.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @returns False; falta confirmar el pedido.
     */
    public estaListoParaFacturar(pedido: Pedido): boolean {
        void pedido;
        return false;
    }
}