import { Plato } from "../iplatomenu/plato";
import { IEstadoPlatoPedido } from "./iEstadoPlatoPedido";
import { EstadoPendientePlato } from "./estadopendienteplato";
export class PlatoPedido {
    private plato : Plato;
    private estado: IEstadoPlatoPedido;
    private notaEspecialPlato: string;

    public constructor(plato:Plato, estado: IEstadoPlatoPedido, notaEspecial: string) {
        this.plato = plato;
        this.estado = new EstadoPendientePlato();
        this.notaEspecialPlato = notaEspecial;
    }

    public setEstado(nuevoEstado: IEstadoPlatoPedido):void {
        this.estado = nuevoEstado;
    }

    public pasarAPreparacion(): void {
        this.estado.pasarAPreparacion(this);
    }

    public marcarComoListo(): void {
        this.estado.marcarListo(this);
    }

    public estaListo(): boolean {
        return this.estado.estaListo();
    }

    public puedeModificarse(): boolean {
        return this.estado.puedeModificarse();
    }

    public calcularPrecio(): number {
        return this.plato.calcularPrecio();
    }

    public getPlato(): Plato {
        return this.plato;
    }

    public getEstado(): IEstadoPlatoPedido {
        return this.estado;
    }

    public getNotaEspecialPedido(): string {
        return this.notaEspecialPlato;
    }
}

