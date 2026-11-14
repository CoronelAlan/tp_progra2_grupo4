import { IPlatoMenu } from "./iplatomenu";
/**
 * Producto individual del menú con nombre, precio y categoría de cocina.
 */
export class Plato implements IPlatoMenu {
    private nombre: string;
    private precio: number;
    private categoria: string;

    /**
     * Crea un plato con su nombre, precio y categoría.
     *
     * @param nombre Nombre identificatorio.
     * @param precio Valor de precio.
     * @param categoria Categoría de cocina asignada.
     */
    public constructor(nombre:string, precio:number, categoria: string) {
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }

    /**
     * Devuelve la categoría de cocina del plato.
     * @returns Categoría de cocina del plato.
     */
    public getCategoria(): string {
        return this.categoria;
    }

    /**
     * Devuelve el nombre del plato.
     * @returns Nombre del plato.
     */
    public getNombre():string { 
        return this.nombre
    }

    /**
     * Devuelve el precio de venta individual.
     * @returns Precio individual de venta.
     */
    public calcularPrecio(): number {
        return this.precio;
    }

    /**
     * Devuelve este plato como una lista de un elemento.
     * @returns Lista con este mismo plato.
     */
    public obtenerPlatos(): Plato[] {
        return [this];
    }

}