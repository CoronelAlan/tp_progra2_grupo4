import {ITipoPedido} from "./ItipoPedido";
const COSTO_ADICIONAL_SALON = 0;

export class PedidoRetirar implements ITipoPedido {
    private horarioRetiro : string;
    private costoAdicional : number;

    public constructor(horarioRetiro: string) {
        this.horarioRetiro = horarioRetiro;
        this.costoAdicional = COSTO_ADICIONAL_SALON;
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