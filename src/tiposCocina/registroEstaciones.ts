import { EstacionCocina } from "./estacionCocina";
import { PlatoPedido } from "../platoPedido/platoPedido";

export class RegistroEstaciones {
    private primeraEstacion: EstacionCocina | null = null;
    private estacionesRegistradas: EstacionCocina[] = [];

    public registrarEstacion(estacion: EstacionCocina): void {
        this.estacionesRegistradas.push(estacion);
        if (!this.primeraEstacion) {
            this.primeraEstacion = estacion;
        } else {
            let actual = this.primeraEstacion;
            while (actual['siguienteEstacion'] !== null) {
                actual = actual['siguienteEstacion'] as EstacionCocina;
            }
            actual.setSiguiente(estacion);
        }
    }

    public derivarPlato(platoPedido: PlatoPedido): void {
        if (!this.primeraEstacion) {
            throw new Error("No hay estaciones de cocina configuradas en el sistema.");
        }
        this.primeraEstacion.procesarPlato(platoPedido);
    }

    public getEstaciones(): EstacionCocina[] {
        return this.estacionesRegistradas;
    }
}