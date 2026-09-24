import { PlatoPedido } from "./platoPedido";

export interface IEstadoPlato {
    
    inicarPreparacion(plato: PlatoPedido): void

    marcarListo(plato: PlatoPedido): void

    puedeModificarse(): boolean

    estaListo(): boolean

}