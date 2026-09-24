import { IEstadoPlato } from "./IEstadoPlato";

export default class Pendiente implements IEstadoPlato {
    
    inicarPreparacion(plato: PlatoPedido): void {
    }
    
    marcarListo(plato: PlatoPedido): void {
    }
    
    puedeModificarse(): boolean {
    }
    
    estaListo(): boolean {
    }

}