import { IEstrategiaDeDescuento } from "./iestrategiadescuento";
import { DiaDeLaSemana } from "../diasemana";
const NUMBER = 100;
export class DescuentoDiaEspecial implements IEstrategiaDeDescuento {
    private porcentaje:number;
    private diaSemana: DiaDeLaSemana;

    public constructor(porcentaje: number, diaSemana: DiaDeLaSemana) {
        this.porcentaje = porcentaje;
        this.diaSemana = diaSemana;
    }

    public calcularDescuento(total: number, diaDeDescuento: DiaDeLaSemana): number {
        let resultado = 0;
        if (this.diaSemana === diaDeDescuento) {
            resultado = total * (this.porcentaje/NUMBER);
        }
        else {
            resultado = total
        }

        return resultado;

    }
}