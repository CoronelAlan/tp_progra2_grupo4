import { MedioDePago } from "./mediodepago";

const PORCENTAJE = 100;
const ZERO = 0;
const NUMBER_ONE = 1;

export class TarjetaDeCredito extends MedioDePago {
    private recargoPorcentaje: number;

   public constructor(recargoPorcentaje?: number) {
        super();
        this.recargoPorcentaje = recargoPorcentaje ?? ZERO; 
    }

    public pagar(monto: number): number {
        let resultado;
        if (this.recargoPorcentaje > ZERO) {
            resultado = monto * (NUMBER_ONE + this.recargoPorcentaje / PORCENTAJE);
        } else {
            resultado = super.pagar(monto)
        }

        return resultado;
    }
}
