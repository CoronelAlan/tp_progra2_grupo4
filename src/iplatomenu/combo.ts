import { Plato } from "./plato";
import { IPlatoMenu } from "./iplatomenu";
import { IEstrategiaBeneficio } from "../iestrategiabeneficio/iestrategiabeneficio";

export class Combo implements IPlatoMenu{
    private nombre: string;
    private platosIncluidos: Plato[];
    private beneficio: IEstrategiaBeneficio;

    public constructor(nombre: string, platosIncluidos: Plato[], beneficio: IEstrategiaBeneficio){
        this.nombre = nombre;
        this.platosIncluidos = platosIncluidos;
        this.beneficio = beneficio;
    }

    public calcularPrecio(): number {
        
    }

    public obtenerPlatos(): Plato[] {
        
    }
}