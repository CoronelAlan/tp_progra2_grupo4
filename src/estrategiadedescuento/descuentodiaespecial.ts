import { IEstrategiaDeDescuento } from "./iestrategiadescuento";
import { DiaDeLaSemana } from "../diasemana";

export class DescuentoDiaEspecial implements IEstrategiaDeDescuento {
    private porcentaje:number;
    private dia: DiaDeLaSemana;

    public constructor(porcentaje: number, dia: DiaDeLaSemana) {
        this.porcentaje = porcentaje;
        this.dia = dia;
    }

    public calcularDescuento(total: number, diaDeDescuento: DiaDeLaSemana): number {
        let resultado = 0;
        if (this.dia === diaDeDescuento) {
            resultado = total * (this.porcentaje/100);
        }
        else {
            resultado = total
        }

        return resultado;

    }
}