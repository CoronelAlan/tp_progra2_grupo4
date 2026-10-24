import { PlatoPedido } from "./platoPedido";

export interface IEstadoPlatoPedido {
    
    pasarAPreparacion(plato: PlatoPedido): void;

    marcarListo(plato: PlatoPedido): void;

    puedeModificarse(): boolean;

    estaListo(): boolean;

}