import { MedioDePago } from "./mediodepago/mediodepago";
import Pedido from "./pedido/pedido";

export class Cliente {
 private nombre : string;
 private apellido : string;
 private pedidoActual? : Pedido;
 
 public constructor(nombre: string, apellido: string) {
    this.apellido = apellido;
    this.nombre = nombre;
 }

 public agregarPedido(pedido: Pedido): void {
   this.pedidoActual = pedido;
 };

 public terminarPedido(): Pedido {
    if (this.pedidoActual === undefined) {
        throw new Error('El cliente no tiene un pedido activo');
    }

    return this.pedidoActual;
}

public pagar(medioDePago: MedioDePago): number {
    if (this.pedidoActual === undefined) {
            throw new Error('El cliente no tiene un pedido activo');
        }

        const total = this.pedidoActual.calcularTotal(medioDePago);

        return medioDePago.pagar(total);
    }
}