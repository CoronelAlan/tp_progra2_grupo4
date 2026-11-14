import { IEstrategiaBeneficio } from "./iestrategiabeneficio";

/**
 * Establece un precio fijo de combo, sin depender del precio base.
 */
export class PrecioFijoCombo implements IEstrategiaBeneficio {
    private precioFijo: number;

    /**
     * Configura el valor final del combo.
     *
     * @param precioFijo Precio acordado para el combo.
     */
    public constructor(precioFijo:number) {
        this.precioFijo = precioFijo;
    }

    /**
     * Devuelve el precio fijo configurado para el combo.
     *
     * @param precioBase Suma de los precios individuales.
     * @returns Precio fijo configurado.
     */
    public calcular(precioBase: number):number {
        void precioBase;
        return this.precioFijo;
    }
}