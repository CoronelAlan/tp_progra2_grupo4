
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

export class Pedido {
    private platosCocina: PlatoPedido[];
    private historialModificacionesPedido: PlatoPedido[][] = [];
    private historialPlatosMenu: IPlatoMenu[][] = [];
    private historialPlatosPorMenu: PlatoPedido[][][] = [];
    private tipoPedido: ITipoPedido;
    private estado: IEstadoPedido = new PedidoEnConstruccion();
    private platosMenu: IPlatoMenu[] = [];
    private platosPorMenu: PlatoPedido[][] = [];

    public constructor(_platosCocina: PlatoPedido[], _tipoPedido: ITipoPedido) {
        this.platosCocina = [..._platosCocina];
        this.tipoPedido = _tipoPedido;

        for (const platoPedido of _platosCocina) {
            this.platosMenu.push(platoPedido.getPlato());
            this.platosPorMenu.push([platoPedido]);
        }
    }

    public agregarPlato(platoMenu: IPlatoMenu): void {
        this.estado.agregarPlato(this, platoMenu);
    }

    public quitarPlato(platoMenu: IPlatoMenu): void {
        this.estado.quitarPlato(this, platoMenu);
    }

    
    
    public confirmarPedido(registroEstaciones: RegistroEstaciones): void {
    this.estado.validarConfirmacion();

    registroEstaciones.validarPlatos(this.platosCocina);

    for (const platoPedido of this.platosCocina) {
        registroEstaciones.derivarPlato(platoPedido);
    }

    this.estado.confirmar(this);
    }



    public estaListoParaFacturar(): boolean {
        return this.estado.estaListoParaFacturar(this);
    }

    public cambiarEstadoPedido(nuevoEstado: IEstadoPedido): void {
        this.estado = nuevoEstado;
    }

    public agregarPlatoAlHistorialYCocina(platoMenu: IPlatoMenu): void {
        this.guardarEstadoEnHistorial();
        this.agregarPlatosNuevosACocina(platoMenu);
    }

    
public removerPlatoDelPedido(platoMenu: IPlatoMenu): void {
    const indiceMenu = this.platosMenu.indexOf(platoMenu);

    if (indiceMenu !== MINUSONE) {
        this.removerMenuRegistrado(indiceMenu);
    } else {
        this.removerPlatoInicial(platoMenu);
    }
}


    public verificarPlatosListosParaFacturar(): boolean {
        return this.platosCocina.every(platoPedido => platoPedido.estaListo());
    }

    
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


    
    public getPlatosCocina(): PlatoPedido[] {
    return [...this.platosCocina];
    }


    public getTipoPedido(): ITipoPedido {
        return this.tipoPedido;
    }

    public calcularPrecioTotal(): number {
        return this.sumarPlatos() + this.costoAdicional();
    }

    private sumarPlatos(): number {
        let total = ZERO;

        for (const platoMenu of this.platosMenu) {
            total += platoMenu.calcularPrecio();
        }

        return total;
    }


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


    private costoAdicional(): number {
        return this.tipoPedido.calcularCostoAdicional();
    }

    private guardarEstadoEnHistorial(): void {
        this.historialModificacionesPedido.push([...this.platosCocina]);
        this.historialPlatosMenu.push([...this.platosMenu]);
        this.historialPlatosPorMenu.push(
            this.platosPorMenu.map(grupo => [...grupo])
        );
    }

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
