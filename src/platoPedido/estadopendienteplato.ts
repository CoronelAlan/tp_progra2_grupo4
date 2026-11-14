import { PlatoPedido } from "./platoPedido";
import { IEstadoPlatoPedido } from "./iEstadoPlatoPedido";
import { EstadoEnPreparacionPlato } from "./enPreparacion";

/**
 * Estado inicial de un plato que aún no comenzó a prepararse.
 */
export class EstadoPendientePlato implements IEstadoPlatoPedido {
    
    /**
     * Pasa el plato de pendiente a en preparación.
     *
     * @param platoPedido Plato del pedido a evaluar o procesar.
     */
    public pasarAPreparacion(platoPedido: PlatoPedido): void {
        console.log("El plato pasa a preparación");
        platoPedido.setEstado(new EstadoEnPreparacionPlato());
    }
    
    /**
     * Impide saltar directamente de pendiente a listo.
     *
     * @param _plato Plato individual.
     * @throws Error porque el plato aún no pasó por preparación.
     */
    public marcarListo(_plato: PlatoPedido): void {
        void _plato;
        throw new Error("No se puede marcar como listo, el plato todavía esta pendiente")
    }
    
    /**
     * Indica que el plato todavía está pendiente.
     * @returns False; el plato todavía está pendiente.
     */
    public estaListo(): boolean {
        return false;
    }

    /**
     * Permite modificar un plato pendiente.
     * @returns True; todavía se puede modificar.
     */
    public puedeModificarse(): boolean {
        return true;
    }

}