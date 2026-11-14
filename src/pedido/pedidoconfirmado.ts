import { IPlatoMenu } from "../iplatomenu/iplatomenu";
import { Pedido } from "./pedido";
import { IEstadoPedido } from "./iestadopedido";

/**
 * Estado que impide cambios de un pedido y habilita la evaluación para facturar.
 */
export class PedidoConfirmado implements IEstadoPedido {

    /**
     * Rechaza el agregado de ítems en un pedido confirmado.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @param platoMenu Plato o combo del menú.
     * @throws Error porque un pedido confirmado no admite nuevos platos.
     */
    public agregarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void {
        void pedido;
        void platoMenu;

        throw new Error("No se puede modificar un pedido confirmado.");
    }

    /**
     * Rechaza la eliminación de ítems de un pedido confirmado.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @param platoMenu Plato o combo del menú.
     * @throws Error porque un pedido confirmado no admite quitar platos.
     */
    public quitarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void {
         void pedido;
        void platoMenu;
        throw new Error("No se puede modificar un pedido confirmado.");
    }

    /**
     * Rechaza una nueva confirmación del pedido.
     * @throws Error porque el pedido ya está confirmado.
     */
    public validarConfirmacion(): void {
    throw new Error("El pedido ya se encuentra confirmado.");
    }

    /**
     * Rechaza deshacer cambios de un pedido confirmado.
     * @throws Error porque los pedidos confirmados no admiten Undo.
     */
    public validarDeshacer(): void {
    throw new Error("No se puede deshacer un pedido confirmado.");
    }

    /**
     * Rechaza la confirmación repetida del pedido.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @throws Error porque el pedido ya está confirmado.
     */
    public confirmar(pedido: Pedido): void {
         void pedido;
        throw new Error("El pedido ya se encuentra confirmado.");
    }

    /**
     * Permite facturar cuando todos los platos están listos.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @returns True si todos los platos del pedido están listos.
     */
    public estaListoParaFacturar(pedido: Pedido): boolean {
        return pedido.verificarPlatosListosParaFacturar();
    }
}