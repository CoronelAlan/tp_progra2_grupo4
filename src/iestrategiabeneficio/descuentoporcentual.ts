import { IEstrategiaBeneficio } from "./iestrategiabeneficio";

const PORCENTAJE = 100;
export class DescuentoPorcentual implements IEstrategiaBeneficio {
    private porcentajeDescuento: number; 

    public constructor(porcentajeDescuento: number) {
        this.porcentajeDescuento = porcentajeDescuento;
    }

    public calcular(precioBase: number): number {
        const descuento = precioBase * (this.porcentajeDescuento /PORCENTAJE);
        return precioBase - descuento;
    }
}