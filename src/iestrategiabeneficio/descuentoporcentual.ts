import { IEstrategiaBeneficio } from "./iestrategiabeneficio";

const PORCENTAJE = 100;
/**
 * Aplica un porcentaje de reducción al precio base de un combo.
 */
export class DescuentoPorcentual implements IEstrategiaBeneficio {
    private porcentajeDescuento: number; 

    /**
     * Configura el porcentaje de descuento del combo.
     *
     * @param porcentajeDescuento Porcentaje de descuento.
     */
    public constructor(porcentajeDescuento: number) {
        this.porcentajeDescuento = porcentajeDescuento;
    }

    /**
     * Resta del precio base el porcentaje configurado.
     *
     * @param precioBase Suma de los precios individuales.
     * @returns Precio del combo con el porcentaje descontado.
     */
    public calcular(precioBase: number): number {
        const descuento = precioBase * (this.porcentajeDescuento /PORCENTAJE);
        return precioBase - descuento;
    }
}