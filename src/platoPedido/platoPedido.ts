import { Plato } from "../iplatomenu/plato";
import { IEstadoPlatoPedido } from "./iEstadoPlatoPedido";
import { EstadoPendientePlato } from "./estadopendienteplato";
/**
 * Representa una unidad pedida, con un estado de preparación y una nota.
 */
export class PlatoPedido {
    private plato : Plato;
    private estado: IEstadoPlatoPedido;
    private notaEspecialPlato: string;

    /**
     * Crea un plato pedido en estado pendiente, con la nota indicada.
     *
     * @param plato Plato individual.
     * @param estado Estado inicial.
     * @param notaEspecial Nota especial del plato.
     */
    public constructor(plato:Plato, estado: IEstadoPlatoPedido, notaEspecial: string) {
        this.plato = plato;
        this.estado = new EstadoPendientePlato();
        this.notaEspecialPlato = notaEspecial;
    }

    /**
     * Actualiza el estado de preparación del plato.
     *
     * @param nuevoEstado Nuevo estado a establecer.
     */
    public setEstado(nuevoEstado: IEstadoPlatoPedido):void {
        this.estado = nuevoEstado;
    }

    /**
     * Solicita al estado actual iniciar la preparación.
     */
    public pasarAPreparacion(): void {
        this.estado.pasarAPreparacion(this);
    }

    /**
     * Solicita al estado actual marcar el plato como listo.
     */
    public marcarComoListo(): void {
        this.estado.marcarListo(this);
    }

    /**
     * Consulta al estado actual si el plato está listo.
     * @returns True si el plato alcanzó el estado listo.
     */
    public estaListo(): boolean {
        return this.estado.estaListo();
    }

    /**
     * Consulta al estado actual si se puede modificar.
     * @returns True si todavía se permite modificar el plato.
     */
    public puedeModificarse(): boolean {
        return this.estado.puedeModificarse();
    }

    /**
     * Devuelve el precio individual del plato.
     * @returns Precio individual del plato.
     */
    public calcularPrecio(): number {
        return this.plato.calcularPrecio();
    }

    /**
     * Devuelve el plato del menú asociado.
     * @returns Plato de menú asociado a esta unidad.
     */
    public getPlato(): Plato {
        return this.plato;
    }

    /**
     * Devuelve el estado de preparación actual.
     * @returns Estado de preparación actual.
     */
    public getEstado(): IEstadoPlatoPedido {
        return this.estado;
    }

    /**
     * Devuelve la nota especial indicada para la preparación.
     * @returns Nota especial de preparación.
     */
    public getNotaEspecialPedido(): string {
        return this.notaEspecialPlato;
    }
}

