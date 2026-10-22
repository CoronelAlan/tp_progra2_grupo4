import { Pedido } from "./pedido";
import { IPlatoMenu } from "../iplatomenu/iplatomenu";

export interface IEstadoPedido {
    agregarPlato(pedido: Pedido, platomenu: IPlatoMenu): void;

    quitarPlato(pedido: Pedido, platoMenu: IPlatoMenu): void;

    confirmar(pedido: Pedido): void;

    estaListoParaFacturar(Pedido: Pedido): boolean;
}