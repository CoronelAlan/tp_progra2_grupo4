import { PlatoPedido } from "../platoPedido";

export abstract class EstacionCocina {
    private cola: Map <string, PlatoPedido>;

    public constructor(_cola: Map <string, PlatoPedido>) {
        this.cola = _cola;
    }

    public recibirPlato(plato: PlatoPedido): void {
        const clave = plato.getPlato().getNombre();

        this.cola.set(clave, plato);
    }

    public prepararPlato(): void {
    for (const [clave, plato] of this.cola) {
        plato.iniciarPreparacion();

        plato.marcarListo();

        this.cola.delete(clave);

        break;
    }
}
    

}