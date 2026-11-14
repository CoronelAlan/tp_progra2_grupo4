import {ITipoPedido} from "./ItipoPedido";
const COSTO_ADICIONAL_SALON = 0;

/**
 * Modalidad de pedido con horario de retiro.
 */
export class PedidoRetirar implements ITipoPedido {
    private horarioRetiro : string;
    private costoAdicional : number;

    /**
     * Crea un pedido para retirar en un horario.
     *
     * @param horarioRetiro Horario previsto para retirar.
     */
    public constructor(horarioRetiro: string) {
        this.horarioRetiro = horarioRetiro;
        this.costoAdicional = COSTO_ADICIONAL_SALON;
    }

    /**
     * Devuelve el costo adicional de retiro (cero).
     * @returns Costo adicional de retirar, cero.
     */
    public calcularCostoAdicional(): number {
        return this.costoAdicional;
        }

    /**
     * Devuelve la descripción y horario de retiro.
     * @returns Descripción con el horario de retiro.
     */
    public getDescripcion(): string {
        return `Pedido para retirar, horario: ${this.horarioRetiro}`;
    }

    /**
     * Devuelve el horario de retiro.
     * @returns Horario acordado para retirar.
     */
    public getHorarioRetiro() : string {
        return this.horarioRetiro;
    }
    

}