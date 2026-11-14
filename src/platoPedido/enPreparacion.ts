import { IEstadoPlatoPedido } from "./iEstadoPlatoPedido";
import { PlatoPedido } from "./platoPedido";
import { EstadoListoPlato } from "./estadolistoplato";

/**
 * Estado de un plato que está siendo preparado.
 */
export class EstadoEnPreparacionPlato implements IEstadoPlatoPedido {
    /**
     * Rechaza iniciar preparación de un plato que ya se prepara.
     *
     * @param _platoPedido Plato del pedido.
     * @throws Error porque el plato ya está en preparación.
     */
    public pasarAPreparacion(_platoPedido: PlatoPedido): void {
        void _platoPedido;
        throw new Error("El plato ya esta en preparación");
    }

    /**
     * Marca el plato como listo mediante un cambio de estado.
     *
     * @param platoPedido Plato del pedido a evaluar o procesar.
     */
    public marcarListo(platoPedido: PlatoPedido): void {
        console.log("El plato ya está listo para servir");
        platoPedido.setEstado(new EstadoListoPlato());
    }

    /**
     * Indica que el plato aún no está listo.
     * @returns False; el plato sigue preparándose.
     */
    public estaListo(): boolean {
        return false;
    }

    /**
     * Impide modificar un plato en preparación.
     * @returns False; el plato está en preparación.
     */
    public puedeModificarse(): boolean {
        return false;
    }
}