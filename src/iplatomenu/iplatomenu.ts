import { Plato } from "./plato"
export interface IPlatoMenu {
    public calcularPrecio():number
    public obtenerPlatos():Plato[]
}