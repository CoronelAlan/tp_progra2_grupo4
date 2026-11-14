import { PlatoPedido } from "../platoPedido/platoPedido";

/**
 * Base de las estaciones: deriva platos por la cadena y administra la cola FIFO.
 */
export abstract class EstacionCocina {
    protected siguienteEstacion: EstacionCocina | null = null;
    protected platosAsignados: PlatoPedido[] = [];
    private platoEnPreparacion: PlatoPedido | null = null;
    protected categoriaAtendida: string;

    /**
     * Configura la categoría que atenderá la estación.
     *
     * @param categoria Categoría de cocina asignada.
     */
    public constructor(categoria: string) {
        this.categoriaAtendida = categoria;
    }

    /**
     * Enlaza la estación con la siguiente de la cadena.
     *
     * @param estacion Estación que se incorpora a la cadena.
     * @returns Estación agregada como siguiente eslabón.
     */
    public setSiguiente(estacion: EstacionCocina): EstacionCocina {
        this.siguienteEstacion = estacion;
        return estacion;
    }

    /**
     * Busca una estación que pueda recibir el plato sin encolarlo.
     *
     * @param platoPedido Plato del pedido a evaluar o procesar.
     * @returns True si alguna estación de la cadena acepta el plato.
     */
    public puedeProcesarPlato(platoPedido: PlatoPedido): boolean {
        if (this.puedeManejarPlato(platoPedido)) {
            return true;
        }

        if (this.siguienteEstacion) {
            return this.siguienteEstacion.puedeProcesarPlato(platoPedido);
        }

        return false;
    }

    /**
     * Encola el plato en esta estación o lo deriva a la siguiente.
     *
     * @param platoPedido Plato del pedido a evaluar o procesar.
     * @throws Error si ninguna estación de la cadena acepta la categoría.
     */
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

    /**
     * Toma el primero de la cola y lo pasa a preparación.
     * @returns Primer plato pendiente de la cola.
     * @throws Error si la estación está ocupada o no tiene platos pendientes.
     */
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

    /**
     * Marca como listo el plato actualmente en preparación.
     * @throws Error si no hay ningún plato en preparación.
     */
    public finalizarPlatoActual(): void {
        if (!this.platoEnPreparacion) {
            throw new Error("No hay un plato en preparación en esta estación.");
        }

        this.platoEnPreparacion.marcarComoListo();
        this.platoEnPreparacion = null;
    }

    /**
     * Determina si la estación atiende la categoría del plato.
     *
     * @param platoPedido Plato del pedido a evaluar o procesar.
     * @returns True si la categoría pertenece a esta estación.
     */
    protected abstract puedeManejarPlato(platoPedido: PlatoPedido): boolean;
    /**
     * Agrega el plato a la cola de esta estación.
     *
     * @param platoPedido Plato del pedido a evaluar o procesar.
     */
    protected abstract agregarPlato(platoPedido: PlatoPedido): void;
}
