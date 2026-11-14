import { Plato } from "./plato"
/**
 * Operaciones comunes de un plato individual y un combo del menú.
 */
export interface IPlatoMenu {
     /**
      * Obtiene el precio del ítem del menú.
      * @returns Precio del ítem del menú.
      */
     calcularPrecio():number;
     /**
      * Obtiene los platos individuales que deben enviarse a cocina.
      * @returns Platos individuales que representa el ítem.
      */
     obtenerPlatos():Plato[];
     /**
      * Obtiene el nombre del ítem del menú.
      * @returns Nombre del ítem.
      */
     getNombre(): string;
}