import { PlatoPedido } from "../platoPedido/platoPedido";

export abstract class EstacionCocina {
    protected siguienteEstacion: EstacionCocina | null = null;
    protected platosAsignados: PlatoPedido[] = [];
    private platoEnPreparacion: PlatoPedido | null = null;
    protected categoriaAtendida: string;

    public constructor(categoria: string) {
        this.categoriaAtendida = categoria;
    }

    public setSiguiente(estacion: EstacionCocina): EstacionCocina {
        this.siguienteEstacion = estacion;
        return estacion;
    }

    public puedeProcesarPlato(platoPedido: PlatoPedido): boolean {
        if (this.puedeManejarPlato(platoPedido)) {
            return true;
        }

        if (this.siguienteEstacion) {
            return this.siguienteEstacion.puedeProcesarPlato(platoPedido);
        }

        return false;
    }

    public procesarPlato(platoPedido: PlatoPedido): void {
        if (this.puedeManejarPlato(platoPedido)) {
            this.agregarPlato(platoPedido);
            return;
        }

        if (this.siguienteEstacion) {
            this.siguienteEstacion.procesarPlato(platoPedido);
            return;
        }

        throw new Error("Ninguna estación puede procesar este tipo de plato.");
    }

    public iniciarSiguientePlato(): PlatoPedido {
        if (this.platoEnPreparacion !== null) {
            throw new Error("La estación ya tiene un plato en preparación.");
        }

        const siguientePlato = this.platosAsignados[0];

        if (!siguientePlato) {
            throw new Error("No hay platos pendientes en esta estación.");
        }

        siguientePlato.pasarAPreparacion();
        this.platosAsignados.shift();
        this.platoEnPreparacion = siguientePlato;

        return siguientePlato;
    }

    public finalizarPlatoActual(): void {
        if (!this.platoEnPreparacion) {
            throw new Error("No hay un plato en preparación en esta estación.");
        }

        this.platoEnPreparacion.marcarComoListo();
        this.platoEnPreparacion = null;
    }

    protected abstract puedeManejarPlato(platoPedido: PlatoPedido): boolean;
    protected abstract agregarPlato(platoPedido: PlatoPedido): void;
}
