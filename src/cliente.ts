import { Pedido } from "./pedido/pedido";

/**
 * Representa a un cliente y mantiene los pedidos asociados a él.
 */
export class Cliente {
    private nombre: string;
    private apellido: string;
    private pedidos: Pedido[] = [];

    /**
     * Crea un cliente con nombre y apellido.
     *
     * @param nombre Nombre identificatorio.
     * @param apellido Apellido del cliente.
     */
    public constructor(nombre: string, apellido: string) {
        this.nombre = nombre;
        this.apellido = apellido;
    }

    /**
     * Devuelve el nombre y apellido del cliente.
     * @returns Nombre completo del cliente.
     */
    public getNombreCompleto(): string {
        return `${this.nombre} ${this.apellido}`;
    }

    /**
     * Añade un pedido a los asociados al cliente.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     */
    public asociarPedido(pedido: Pedido): void {
        this.pedidos.push(pedido);
    }

    /**
     * Devuelve una copia de la lista de pedidos del cliente.
     * @returns Copia de los pedidos asociados al cliente.
     */
    public getPedidos(): Pedido[] {
        return [...this.pedidos];
    }
}