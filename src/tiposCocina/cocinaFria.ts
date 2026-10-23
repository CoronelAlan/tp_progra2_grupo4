import { EstacionCocina } from "./estacionCocina";
import { PlatoPedido } from '../platoPedido/platoPedido';

export class EstacionCocinaFria extends EstacionCocina {
    protected puedeManejarPlato(platoPedido: PlatoPedido): boolean {
        return platoPedido.getPlato().getCategoria() === this.categoriaAtendida;
    }

    protected agregarPlato(platoPedido: PlatoPedido): void {
        this.platosAsignados.push(platoPedido);
        console.log(`[Cocina Fría] Preparando plato: ${platoPedido.getPlato().getNombre()}`);
    }
}