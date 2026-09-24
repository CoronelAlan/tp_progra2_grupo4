export abstract class EstacionCocina {
    private cola: Map <string, PlatoPedido>;

    public constructor(_cola: Map <string, PlatoPedido>) {
        this.cola = _cola;
    }

    public recibirPlato(plato: PlatoPedido): void {

    }

    public prepararPlato(): void {
       
    }
    

}