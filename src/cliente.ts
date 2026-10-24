import { Pedido } from "./pedido/pedido";

export class Cliente {
    private nombre: string;
    private apellido: string;
    private pedidos: Pedido[] = [];

    public constructor(nombre: string, apellido: string) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    public getNombreCompleto(): string {
        return `${this.nombre} ${this.apellido}`;
    }

    public asociarPedido(pedido: Pedido): void {
        this.pedidos.push(pedido);
    }

    public getPedidos(): Pedido[] {
        return [...this.pedidos];
    }
}