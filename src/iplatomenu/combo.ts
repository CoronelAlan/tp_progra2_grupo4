import { Plato } from "./plato";
import { IPlatoMenu } from "./iplatomenu";
import { IEstrategiaBeneficio } from "../iestrategiabeneficio/iestrategiabeneficio";

export class Combo implements IPlatoMenu {
    private nombre: string;
    private platosIncluidos: Plato[];
    private beneficio: IEstrategiaBeneficio;

    public constructor(nombre: string, platosIncluidos: Plato[], beneficio: IEstrategiaBeneficio) {
        this.nombre = nombre;
        this.platosIncluidos = platosIncluidos;
        this.beneficio = beneficio;
    }

    public calcularPrecio(): number {
        let precioBase = 0;
        for (const plato of this.platosIncluidos) {
            precioBase += plato.calcularPrecio();
        }
        

        return this.beneficio.calcular(precioBase);
    }

    public obtenerPlatos(): Plato[] {
        return this.platosIncluidos;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public getPlatosIncluidos(): Plato[] {
        return this.platosIncluidos;
    }
}