import { PlatoPedido } from "./platoPedido";

/**
 * Contrato de las operaciones y consultas de estado de un plato del pedido.
 */
export interface IEstadoPlatoPedido {
    
    /**
     * Intenta pasar el plato a preparación según su estado.
     *
     * @param plato Plato individual.
     */
    pasarAPreparacion(plato: PlatoPedido): void;

    /**
     * Intenta marcar el plato como listo según su estado.
     *
     * @param plato Plato individual.
     */
    marcarListo(plato: PlatoPedido): void;

    /**
     * Informa si el estado permite modificar el plato.
     * @returns True si el estado admite modificaciones.
     */
    puedeModificarse(): boolean;

    /**
     * Informa si el plato alcanzó el estado listo.
     * @returns True cuando el plato está listo.
     */
    estaListo(): boolean;

}