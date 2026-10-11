import {ItipoPedido} from "./ItipoPedido";
const costoAdicionalSalon = 0;

export class PedidoRetirar implements ItipoPedido {
    private horarioRetiro : string;
    private costoAdicional : number;

    constructor(horarioRetiro: string) {
        this.horarioRetiro = horarioRetiro;
        this.costoAdicional = costoAdicionalSalon;
    }

    public calcularCostoAdicional(): number {
        return this.costoAdicional;
        }

    public getDescripcion(): string {
        return `Pedido para retirar, horario: ${this.horarioRetiro}`;
    }

    public getHorarioRetiro() : string {
        return this.horarioRetiro;
    }
    

}