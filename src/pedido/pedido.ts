
import { ITipoPedido } from "../tipoPedido/ItipoPedido";
import { PlatoPedido } from "../platoPedido/platoPedido";
import { IPlatoMenu } from "../iplatomenu/iplatomenu";
import { IEstadoPedido } from "./iestadopedido";
import { PedidoEnConstruccion } from "./pedidoenconstruccion";
import { EstadoPendientePlato } from "../platoPedido/estadopendienteplato";
import { RegistroEstaciones } from "../tiposCocina/registroEstaciones";

const MINUSONE = -1;
const NUMBER_ONE = 1;
const ZERO = 0;

/**
 * Administra platos de cocina, ítems del menú, historial de cambios y confirmación.
 */
export class Pedido {
    private platosCocina: PlatoPedido[];
    private historialModificacionesPedido: PlatoPedido[][] = [];
    private historialPlatosMenu: IPlatoMenu[][] = [];
    private historialPlatosPorMenu: PlatoPedido[][][] = [];
    private tipoPedido: ITipoPedido;
    private estado: IEstadoPedido = new PedidoEnConstruccion();
    private platosMenu: IPlatoMenu[] = [];
    private platosPorMenu: PlatoPedido[][] = [];

    /**
     * Crea el pedido con su modalidad y registra sus platos iniciales.
     *
     * @param _platosCocina Platos iniciales del pedido.
     * @param _tipoPedido Modalidad del pedido.
     */
    public constructor(_platosCocina: PlatoPedido[], _tipoPedido: ITipoPedido) {
        this.platosCocina = [..._platosCocina];
        this.tipoPedido = _tipoPedido;

        for (const platoPedido of _platosCocina) {
            this.platosMenu.push(platoPedido.getPlato());
            this.platosPorMenu.push([platoPedido]);
        }
    }

    /**
     * Delega en el estado actual el agregado de un ítem del menú.
     *
     * @param platoMenu Plato o combo del menú.
     */
    public agregarPlato(platoMenu: IPlatoMenu): void {
        this.estado.agregarPlato(this, platoMenu);
    }

    /**
     * Delega en el estado actual la eliminación de un ítem del menú.
     *
     * @param platoMenu Plato o combo del menú.
     */
    public quitarPlato(platoMenu: IPlatoMenu): void {
        this.estado.quitarPlato(this, platoMenu);
    }

    
    
    /**
     * Valida el estado y las estaciones, deriva los platos y confirma el pedido.
     *
     * @param registroEstaciones Registro de estaciones disponibles.
     * @throws Error si el pedido ya está confirmado o falta una estación para alguno de sus platos.
     */
    public confirmarPedido(registroEstaciones: RegistroEstaciones): void {
    this.estado.validarConfirmacion();

    registroEstaciones.validarPlatos(this.platosCocina);

    for (const platoPedido of this.platosCocina) {
        registroEstaciones.derivarPlato(platoPedido);
    }

    this.estado.confirmar(this);
    }



    /**
     * Consulta al estado si el pedido puede facturarse.
     * @returns True si el estado permite facturar el pedido.
     */
    public estaListoParaFacturar(): boolean {
        return this.estado.estaListoParaFacturar(this);
    }

    /**
     * Reemplaza el estado actual del pedido.
     *
     * @param nuevoEstado Nuevo estado a establecer.
     */
    public cambiarEstadoPedido(nuevoEstado: IEstadoPedido): void {
        this.estado = nuevoEstado;
    }

    /**
     * Guarda la composición anterior e incorpora el ítem y sus platos.
     *
     * @param platoMenu Plato o combo del menú.
     */
    public agregarPlatoAlHistorialYCocina(platoMenu: IPlatoMenu): void {
        this.guardarEstadoEnHistorial();
        this.agregarPlatosNuevosACocina(platoMenu);
    }

    
/**
 * Localiza el ítem y delega la eliminación correspondiente.
 *
 * @param platoMenu Plato o combo del menú.
 */
public removerPlatoDelPedido(platoMenu: IPlatoMenu): void {
    const indiceMenu = this.platosMenu.indexOf(platoMenu);

    if (indiceMenu !== MINUSONE) {
        this.removerMenuRegistrado(indiceMenu);
    } else {
        this.removerPlatoInicial(platoMenu);
    }
}


    /**
     * Comprueba que todos los platos del pedido estén listos.
     * @returns True si todos los platos se encuentran listos.
     */
    public verificarPlatosListosParaFacturar(): boolean {
        return this.platosCocina.every(platoPedido => platoPedido.estaListo());
    }

    
    /**
     * Restaura la composición anterior si el estado lo permite.
     * @throws Error si se intenta deshacer un pedido confirmado.
     */
    public deshacerUltimaModificacion(): void {
    this.estado.validarDeshacer();

    const platosAnteriores = this.historialModificacionesPedido.pop();

    if (!platosAnteriores) {
        return;
    }

    this.platosCocina = platosAnteriores;
    this.platosMenu = this.historialPlatosMenu.pop() ?? [];
    this.platosPorMenu = this.historialPlatosPorMenu.pop() ?? [];
    }


    
    /**
     * Devuelve una copia de la lista de platos enviados a cocina.
     * @returns Copia del arreglo de platos del pedido.
     */
    public getPlatosCocina(): PlatoPedido[] {
    return [...this.platosCocina];
    }


    /**
     * Devuelve la modalidad del pedido.
     * @returns Modalidad del pedido.
     */
    public getTipoPedido(): ITipoPedido {
        return this.tipoPedido;
    }

    /**
     * Suma los precios de los ítems del menú y el costo de modalidad.
     * @returns Suma de productos y costo adicional.
     */
    public calcularPrecioTotal(): number {
        return this.sumarPlatos() + this.costoAdicional();
    }

    /**
     * Suma precios respetando los beneficios de cada combo.
     * @returns Total de los ítems, incluidos los beneficios de combos.
     */
    private sumarPlatos(): number {
        let total = ZERO;

        for (const platoMenu of this.platosMenu) {
            total += platoMenu.calcularPrecio();
        }

        return total;
    }


/**
 * Quita un ítem registrado y todos sus platos, previa validación.
 *
 * @param indiceMenu Posición del ítem en las listas del pedido.
 * @throws Error si alguno de los platos del ítem ya está en preparación o listo.
 */
private removerMenuRegistrado(indiceMenu: number): void {
    const platosAQuitar = this.platosPorMenu[indiceMenu];

    for (const plato of platosAQuitar) {
        if (!plato.puedeModificarse()) {
            throw new Error("No se puede remover un plato que ya se encuentra en preparación o listo.");
        }
    }

    this.guardarEstadoEnHistorial();

    for (const plato of platosAQuitar) {
        const indicePlato = this.platosCocina.indexOf(plato);

        if (indicePlato !== MINUSONE) {
            this.platosCocina.splice(indicePlato, NUMBER_ONE);
        }
    }

    this.platosMenu.splice(indiceMenu, NUMBER_ONE);
    this.platosPorMenu.splice(indiceMenu, NUMBER_ONE);
}

/**
 * Busca un plato fuera de los grupos registrados e intenta eliminarlo.
 *
 * @param platoMenu Plato o combo del menú.
 * @throws Error si el plato no está registrado o no se puede modificar.
 */
private removerPlatoInicial(platoMenu: IPlatoMenu): void {
    const platosAQuitar = platoMenu.obtenerPlatos();

    if (platosAQuitar.length !== NUMBER_ONE) {
        throw new Error("El combo que intenta remover no se encuentra en el pedido.");
    }

    const platoEnPedido = this.platosCocina.find(plato =>
        plato.getPlato() === platosAQuitar[ZERO] &&
        !this.platosPorMenu.some(grupo => grupo.includes(plato))
    );

    if (!platoEnPedido) {
        throw new Error("El plato que intenta remover no se encuentra en el pedido.");
    }

    if (!platoEnPedido.puedeModificarse()) {
        throw new Error("No se puede remover un plato que ya se encuentra en preparación o listo.");
    }

    this.guardarEstadoEnHistorial();

    this.platosCocina.splice(
        this.platosCocina.indexOf(platoEnPedido),
        NUMBER_ONE
    );
}


    /**
     * Obtiene el costo adicional definido por la modalidad.
     * @returns Importe adicional de la modalidad del pedido.
     */
    private costoAdicional(): number {
        return this.tipoPedido.calcularCostoAdicional();
    }

    /**
     * Guarda copias de las listas necesarias para restaurar una modificación.
     */
    private guardarEstadoEnHistorial(): void {
        this.historialModificacionesPedido.push([...this.platosCocina]);
        this.historialPlatosMenu.push([...this.platosMenu]);
        this.historialPlatosPorMenu.push(
            this.platosPorMenu.map(grupo => [...grupo])
        );
    }

    /**
     * Desglosa un ítem en platos para cocina y conserva su vínculo con el menú.
     *
     * @param platoMenu Plato o combo del menú.
     * @param notaEspecial Nota especial del plato.
     */
    private agregarPlatosNuevosACocina(
        platoMenu: IPlatoMenu,
        notaEspecial: string = ""
    ): void {
        const platosNuevos: PlatoPedido[] = [];

        for (const plato of platoMenu.obtenerPlatos()) {
            const platoPedido = new PlatoPedido(
                plato,
                new EstadoPendientePlato(),
                notaEspecial
            );

            this.platosCocina.push(platoPedido);
            platosNuevos.push(platoPedido);
        }

        this.platosMenu.push(platoMenu);
        this.platosPorMenu.push(platosNuevos);
    }
}
