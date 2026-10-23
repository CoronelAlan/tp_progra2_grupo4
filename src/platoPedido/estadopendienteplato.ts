import { PlatoPedido } from "./platoPedido";
import { IEstadoPlatoPedido } from "./iEstadoPlatoPedido";
import { EstadoEnPreparacionPlato } from "./enPreparacion";

export class EstadoPendientePlato implements IEstadoPlatoPedido {
    
    public pasarAPreparacion(platoPedido: PlatoPedido): void {
        console.log("El plato pasa a preparación");
        platoPedido.setEstado(new EstadoEnPreparacionPlato());
    }
    
    public marcarListo(_plato: PlatoPedido): void {
        void _plato;
        throw new Error("No se puede marcar como listo, el plato todavía esta pendiente")
    }
    
    public estaListo(): boolean {
        return false;
    }

    public puedeModificarse(): boolean {
        return true;
    }

}