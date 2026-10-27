import { Pedido } from "./pedido/pedido";


export class HistorialPedidos {
    private pedidosFinalizados: Pedido[];

    public constructor(_pedidosFinalizados: Pedido[]) {
        this.pedidosFinalizados = _pedidosFinalizados;
    }

    public registrarPedido(pedido: Pedido): void {
        this.pedidosFinalizados.push(pedido)
    }

    public getPedidosFinalizados(): Pedido[] {
        return [...this.pedidosFinalizados];
    }

    public buscarPorTipo(tipoDeDescripcion: string): Pedido[] {
        return this.pedidosFinalizados.filter(
            pedido => pedido.getTipoPedido().getDescripcion() === tipoDeDescripcion
        );
    }

}