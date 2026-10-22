import { Plato } from "./iplatomenu/plato";
import { IEstadoPlato } from "./estadoPlato/IEstadoPlato";
export class PlatoPedido {
    private plato : Plato;
    private estado: IEstadoPlato;

    public constructor(plato:Plato, estado:new Pendiente()) {
        this.plato = plato;
        this.estado = estado;
    }

    public getPlato() : Plato {

    }

    public iniciarPreparacion() : void {

    }

    public marcarListo(): void {}

    public puedeModificarse() : boolean {}

    public cambiarEstado(estado: IestadoPlato) : void {};
}