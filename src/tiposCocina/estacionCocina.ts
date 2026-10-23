import { PlatoPedido } from "../platoPedido/platoPedido";

export abstract class EstacionCocina {
    protected siguienteEstacion: EstacionCocina | null = null;
    protected platosAsignados: PlatoPedido[] = [];
    protected categoriaAtendida: string;

    public constructor(categoria: string) {
        this.categoriaAtendida = categoria;
    }
    

    public setSiguiente(estacion: EstacionCocina): EstacionCocina {
        this.siguienteEstacion = estacion;
        return estacion;
    }

    public procesarPlato(platoPedido: PlatoPedido): void {
        
        if (this.puedeManejarPlato(platoPedido)) {
            this.agregarPlato(platoPedido);
            return;
        }

        
        if (this.siguienteEstacion) {
            this.siguienteEstacion.procesarPlato(platoPedido);
            return;
        }
        

    
        throw new Error("Ninguna estación puede procesar este tipo de plato.");
    }


    protected abstract puedeManejarPlato(platoPedido: PlatoPedido):boolean;
    protected abstract agregarPlato(platoPedido: PlatoPedido): void;
    

}