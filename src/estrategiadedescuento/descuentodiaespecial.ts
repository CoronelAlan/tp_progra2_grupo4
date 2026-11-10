import { IEstrategiaDeDescuento } from "./iestrategiadescuento";
import { DiaDeLaSemana } from "../diasemana";
import { MedioDePago } from "../mediodepago/mediodepago";
const NUMBER = 100;
const ZERO = 0;
export class DescuentoDiaEspecial implements IEstrategiaDeDescuento {
    private porcentaje:number;
    private diaSemana: DiaDeLaSemana;

    public constructor(porcentaje: number, diaSemana: DiaDeLaSemana) {
        this.porcentaje = porcentaje;
        this.diaSemana = diaSemana;
    }

    public calcularDescuento(total: number, diaDeDescuento: DiaDeLaSemana, medioDePago: MedioDePago): number {
        void medioDePago;
        let resultado;
        if (this.diaSemana === diaDeDescuento) {
            resultado = total * (this.porcentaje/NUMBER);
        }
        else {
            resultado = ZERO
        }

        return resultado ;

    }
}