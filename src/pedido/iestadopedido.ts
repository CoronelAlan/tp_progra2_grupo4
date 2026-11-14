import { Pedido } from "./pedido";
import { IPlatoMenu } from "../iplatomenu/iplatomenu";

/**
 * Contrato de operaciones permitidas según el estado del pedido.
 */
export interface IEstadoPedido {
    /**
     * Agrega un ítem al pedido si su estado lo permite.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @param platomenu Plato o combo del menú.
     */
    agregarPlato(pedido: Pedido, platomenu: IPlatoMenu): void;

    /**
     * Quita un ítem del pedido si su estado lo permite.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     * @param platoMenu Plato o combo del menú.
     */
    quitarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void;

    /**
     * Realiza la transición de confirmación permitida por el estado.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     */
    confirmar(pedido: Pedido): void;

    /**
     * Informa si el estado permite facturar los platos listos.
     *
     * @param Pedido Valor de Pedido.
     * @returns True si el pedido puede facturarse.
     */
    estaListoParaFacturar(Pedido: Pedido): boolean;

    /**
     * Valida si se puede confirmar el pedido sin modificarlo.
     */
    validarConfirmacion(): void;

    /**
     * Valida si se puede deshacer una modificación.
     */
    validarDeshacer(): void;
}