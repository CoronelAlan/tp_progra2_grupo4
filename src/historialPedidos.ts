import { Pedido } from "./pedido/pedido";


/**
 * Registra pedidos finalizados y permite filtrarlos por modalidad.
 */
export class HistorialPedidos {
    private pedidosFinalizados: Pedido[];

    /**
     * Recibe la lista inicial de pedidos finalizados.
     *
     * @param _pedidosFinalizados Pedidos ya registrados como finalizados.
     */
    public constructor(_pedidosFinalizados: Pedido[]) {
        this.pedidosFinalizados = _pedidosFinalizados;
    }

    /**
     * Incorpora un pedido al historial.
     *
     * @param pedido Pedido sobre el cual se realiza la operación.
     */
    public registrarPedido(pedido: Pedido): void {
        this.pedidosFinalizados.push(pedido)
    }

    /**
     * Devuelve una copia de la lista de pedidos finalizados.
     * @returns Copia de los pedidos finalizados.
     */
    public getPedidosFinalizados(): Pedido[] {
        return [...this.pedidosFinalizados];
    }

    /**
     * Filtra los pedidos por la descripción de su modalidad.
     *
     * @param tipoDeDescripcion Descripción de la modalidad a buscar.
     * @returns Pedidos que coinciden con la descripción indicada.
     */
    public buscarPorTipo(tipoDeDescripcion: string): Pedido[] {
        return this.pedidosFinalizados.filter(
            pedido => pedido.getTipoPedido().getDescripcion() === tipoDeDescripcion
        );
    }

}