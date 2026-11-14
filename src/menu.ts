import { IPlatoMenu } from "./iplatomenu/iplatomenu";


/**
 * Mantiene los productos y combos disponibles para la venta.
 */
export class Menu {

    private platos : IPlatoMenu[];

    /**
     * Crea el menú a partir de una lista de ítems.
     *
     * @param platos Platos que se deben validar.
     */
    public constructor(platos : IPlatoMenu[]) {
        this.platos = platos;
    }

    /**
     * Agrega un plato o combo al menú.
     *
     * @param item Plato o combo a incorporar.
     */
    public agregarPlato(item: IPlatoMenu): void {
        this.platos.push(item);
    }

    /**
     * Busca el primer ítem del menú que coincide con el nombre.
     *
     * @param nombre Nombre identificatorio.
     * @returns Ítem encontrado o undefined si no existe.
     */
    public buscarPlatoPorNombre(nombre: string): IPlatoMenu | undefined {
        return this.platos.find(plato => plato.getNombre() === nombre)
    }

    /**
     * Devuelve la lista de ítems almacenados en el menú.
     * @returns Ítems disponibles en el menú.
     */
    public getPlato(): IPlatoMenu[] {
        return this.platos;
    }

    

}