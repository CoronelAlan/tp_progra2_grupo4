import { IPlatoMenu } from "./iplatomenu/iplatomenu";


export class Menu {

    private platos : IPlatoMenu[];

    public constructor(platos : IPlatoMenu[]) {
        this.platos = platos;
    }

    public agregarPlato(item: IPlatoMenu): void {
        this.platos.push(item);
    }

    public buscarPlatoPorNombre(nombre: string): IPlatoMenu | undefined {
        return this.platos.find(plato => plato.getNombre() === nombre)
    }

    public getPlato(): IPlatoMenu[] {
        return this.platos;
    }

    

}