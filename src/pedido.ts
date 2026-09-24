export default class Pedido {
    private platosCocina: PlatoPedido[]
    private tipoPedido: ITipoPedido;
    private confirmado: boolean;

    public constructor(_platosCocina: PlatoPedido[], _tipoPedido: ITipoPedido, _confirmado: boolean) {
        this.platosCocina = _platosCocina;
        this.tipoPedido = _tipoPedido;
        this.confirmado = _confirmado;
    }

    public agregarPlato(plato: IPlatoMenu): void {

    }

    public quitarPlato(plato: IPlatoMenu): void {

    }

    public confirmar(): void {

    }

    public estaListoParaFacturar(): boolean {

    }

    public getTipoPedido(): ITipoPedido {
        
    }
}