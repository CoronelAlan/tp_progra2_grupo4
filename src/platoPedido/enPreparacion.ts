import { IEstadoPlatoPedido } from "./iEstadoPlatoPedido";
import { PlatoPedido } from "./platoPedido";
import { EstadoListoPlato } from "./estadolistoplato";

export class EstadoEnPreparacionPlato implements IEstadoPlatoPedido {
    public pasarAPreparacion(_platoPedido: PlatoPedido): void {
        void _platoPedido;
        throw new Error("El plato ya esta en preparación");
    }

    public marcarListo(platoPedido: PlatoPedido): void {
        console.log("El plato ya está listo para servir");
        platoPedido.setEstado(new EstadoListoPlato());
    }

    public estaListo(): boolean {
        return false;
    }

    public puedeModificarse(): boolean {
        return false;
    }
}