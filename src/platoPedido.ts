export class PlatoPedido {
    private plato : Plato;
    private estado: IestadoPlato;

    public getPlato() : Plato {

    }

    public iniciarPreparacion() : void {

    }

    public marcarListo(): void {}

    public puedeModificarse() : boolean{}

    public cambiarEstado(estado: IestadoPlato) : void {};
}