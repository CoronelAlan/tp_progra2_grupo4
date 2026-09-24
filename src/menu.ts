export class Menu implements IplatoMenu {

    private platos : IplatoMenu[];

    public constructor(platos : IplatoMenu[]) {
        this.platos = platos;
    }

    public agregarPlato(plato: IplatoMenu): void{};

    public buscarPlato(nombre: string): IplatoMenu{};

    public getPlato(): IplatoMenu[]{};



}