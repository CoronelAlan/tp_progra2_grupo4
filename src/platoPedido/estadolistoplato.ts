import { IEstadoPlatoPedido } from "./iEstadoPlatoPedido";
import { PlatoPedido } from "./platoPedido";

export class EstadoListoPlato implements IEstadoPlatoPedido {
    public pasarAPreparacion(_plato: PlatoPedido): void {
        void _plato;
        throw new Error("No se puede enviar a preparación un plato que ya está listo");
    }

    public marcarListo(_plato: PlatoPedido): void {
        void _plato;
        throw new Error("El plato ya esta listo");
    }

    public estaListo(): boolean {
        return true;
    }

    public puedeModificarse(): boolean {
        return false;
    }
}