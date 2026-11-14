import { IEstadoPlatoPedido } from "./iEstadoPlatoPedido";
import { PlatoPedido } from "./platoPedido";

/**
 * Estado final de un plato preparado.
 */
export class EstadoListoPlato implements IEstadoPlatoPedido {
    /**
     * Rechaza volver a preparar un plato ya listo.
     *
     * @param _plato Plato individual.
     * @throws Error porque el plato ya está listo.
     */
    public pasarAPreparacion(_plato: PlatoPedido): void {
        void _plato;
        throw new Error("No se puede enviar a preparación un plato que ya está listo");
    }

    /**
     * Rechaza marcar listo por segunda vez el mismo plato.
     *
     * @param _plato Plato individual.
     * @throws Error porque el plato ya está listo.
     */
    public marcarListo(_plato: PlatoPedido): void {
        void _plato;
        throw new Error("El plato ya esta listo");
    }

    /**
     * Indica que el plato está listo.
     * @returns True; el plato ya está listo.
     */
    public estaListo(): boolean {
        return true;
    }

    /**
     * Impide modificar un plato listo.
     * @returns False; el plato ya está listo.
     */
    public puedeModificarse(): boolean {
        return false;
    }
}