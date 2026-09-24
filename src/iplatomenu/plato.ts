import { IPlatoMenu } from "./iplatomenu";
export class Plato implements IPlatoMenu{
    private nombre: string;
    private precio: number;

    public constructor(nombre:string, precio:number) {
        this.nombre = nombre;
        this.precio = precio;
    }

    public getNombre():string{
        return this.nombre
    }

    public calcularPrecio(): number {
        
    }

    public obtenerPlatos(): Plato[] {
        
    }

}