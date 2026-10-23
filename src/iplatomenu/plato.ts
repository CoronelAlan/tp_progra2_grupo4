import { IPlatoMenu } from "./iplatomenu";
export class Plato implements IPlatoMenu {
    private nombre: string;
    private precio: number;
    private categoria: string;

    public constructor(nombre:string, precio:number, categoria: string) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }

    public getCategoria(): string {
        return this.categoria;
    }

    public getNombre():string { 
        return this.nombre
    }

    public calcularPrecio(): number {
        return this.precio;
    }

    public obtenerPlatos(): Plato[] {
        return [this];
    }

}