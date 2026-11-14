import { EstacionCocina } from "./estacionCocina";
import { PlatoPedido } from '../platoPedido/platoPedido';

/**
 * Estación que recibe platos correspondientes a su categoría de cocina fría.
 */
export class CocinaFria extends EstacionCocina {
    /**
     * Comprueba si la categoría del plato coincide con la de la estación.
     *
     * @param platoPedido Plato del pedido a evaluar o procesar.
     * @returns True si la categoría del plato coincide con la atendida.
     */
    protected puedeManejarPlato(platoPedido: PlatoPedido): boolean {
        return platoPedido.getPlato().getCategoria() === this.categoriaAtendida;
    }

    /**
     * Añade el plato a la cola de esta estación.
     *
     * @param platoPedido Plato del pedido a evaluar o procesar.
     */
    protected agregarPlato(platoPedido: PlatoPedido): void {
        this.platosAsignados.push(platoPedido);
        console.log(`[Cocina Fría] Preparando plato: ${platoPedido.getPlato().getNombre()}`);
    }
}