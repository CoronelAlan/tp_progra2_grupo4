import { ITipoPedido } from "../tipoPedido/ItipoPedido";
import { PlatoPedido } from "../platoPedido/platoPedido";
import { IPlatoMenu } from "../iplatomenu/iplatomenu";
import { IEstadoPedido } from "./iestadopedido";
import { PedidoEnConstruccion } from "./pedidoenconstruccion";
import { Plato } from "../iplatomenu/plato";
import { EstadoPendientePlato } from "../platoPedido/estadopendienteplato";


const MINUSONE = -1;
const NUMBER_ONE = 1;
const ZERO = 0;

export class Pedido {
    private platosCocina: PlatoPedido[]
    private historialModificacionesPedido: PlatoPedido[][] = []
    private tipoPedido: ITipoPedido;


    private estado: IEstadoPedido = new PedidoEnConstruccion()


    public constructor(_platosCocina: PlatoPedido[], _tipoPedido: ITipoPedido) {
        this.platosCocina = _platosCocina;
        this.tipoPedido = _tipoPedido;
    }

    


    public agregarPlato(platoMenu: IPlatoMenu): void {
       this.estado.agregarPlato(this, platoMenu);
    }

    public quitarPlato(platoMenu: IPlatoMenu): void {
        this.estado.quitarPlato(this, platoMenu);
    }
    
    public confirmarPedido(): void {
        this.estado.confirmar(this)

    }

    public estaListoParaFacturar(): boolean {
        return this.estado.estaListoParaFacturar(this);
    }
    
    public cambiarEstadoPedido(nuevoEstado: IEstadoPedido):void {
        this.estado = nuevoEstado;
    }

    public agregarPlatoAlHistorialYCocina(platoMenu: IPlatoMenu): void {
        this.guardarEstadoEnHistorial();
        this.agregarPlatosNuevosACocina(platoMenu);
    }

    public removerPlatoDelPedido(platoMenu: IPlatoMenu): void {
        this.historialModificacionesPedido.push([...this.platosCocina]);

        const platosAQuitar = platoMenu.obtenerPlatos();

   
    for (const plato of platosAQuitar) {
        this.removerPlatoIndividual(plato);
    }
}


    public verificarPlatosListosParaFacturar(): boolean {
        return this.platosCocina.every(platoPedido => platoPedido.estaListo());
    }

    public deshacerUltimaModificacion(): void {
        this.platosCocina = this.historialModificacionesPedido.pop() ?? this.platosCocina;
    }

    public getPlatosCocina(): PlatoPedido[] {
        return this.platosCocina;
    }

    public getTipoPedido(): ITipoPedido {
        return this.tipoPedido;
    }


    public calcularPrecioTotal(): number {
        return this.sumarPlatos() + this.costoAdicional();
    }






    private removerPlatoIndividual(plato: Plato): void {
        const index = this.platosCocina.findIndex(
        item => item.getPlato() === plato && item.puedeModificarse()
    );

        if (index !== MINUSONE) {
            this.platosCocina.splice(index, NUMBER_ONE);
        }
    }

    private sumarPlatos():number {
        return this.platosCocina.reduce((acumulador, platoPedido) => acumulador + platoPedido.calcularPrecio(), ZERO);
    }
    
    private costoAdicional():number {
        return this.tipoPedido.calcularCostoAdicional();
    }

    private guardarEstadoEnHistorial():void {
        this.historialModificacionesPedido.push([...this.platosCocina]);
    }

    private agregarPlatosNuevosACocina(platoMenu: IPlatoMenu, notaEspecial: string = ""): void {
        const platosNuevos = platoMenu.obtenerPlatos();
        for (const plato of platosNuevos) {
            this.platosCocina.push(new PlatoPedido(plato, new EstadoPendientePlato(), notaEspecial));
        }
    }
}