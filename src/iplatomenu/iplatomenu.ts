import { Plato } from "./plato"
export interface IPlatoMenu {
     calcularPrecio():number;
     obtenerPlatos():Plato[];
     getNombre(): string;
}