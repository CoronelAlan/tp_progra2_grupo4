import { Plato } from "./plato";
import { IPlatoMenu } from "./iplatomenu";
import { IEstrategiaBeneficio } from "../iestrategiabeneficio/iestrategiabeneficio";

/**
 * Agrupa platos individuales y delega su precio final a una estrategia de beneficio.
 */
export class Combo implements IPlatoMenu {
    private nombre: string;
    private platosIncluidos: Plato[];
    private beneficio: IEstrategiaBeneficio;

    /**
     * Crea un combo con sus platos y estrategia de precio.
     *
     * @param nombre Nombre identificatorio.
     * @param platosIncluidos Platos que integran el combo.
     * @param beneficio Estrategia de precio del combo.
     */
    public constructor(nombre: string, platosIncluidos: Plato[], beneficio: IEstrategiaBeneficio) {
        this.nombre = nombre;
        this.platosIncluidos = platosIncluidos;
        this.beneficio = beneficio;
    }

    /**
     * Suma los precios individuales y aplica el beneficio configurado.
     * @returns Precio final del combo con su beneficio.
     */
    public calcularPrecio(): number {
        let precioBase = 0;
        for (const plato of this.platosIncluidos) {
            precioBase += plato.calcularPrecio();
        }
        

        return this.beneficio.calcular(precioBase);
    }

    /**
     * Devuelve los platos individuales incluidos en el combo.
     * @returns Platos individuales que integran el combo.
     */
    public obtenerPlatos(): Plato[] {
        return this.platosIncluidos;
    }

    /**
     * Devuelve el nombre del combo.
     * @returns Nombre del combo.
     */
    public getNombre(): string {
        return this.nombre;
    }

    /**
     * Devuelve los platos incluidos en el combo.
     * @returns Lista de platos incluidos en el combo.
     */
    public getPlatosIncluidos(): Plato[] {
        return this.platosIncluidos;
    }
}