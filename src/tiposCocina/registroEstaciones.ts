import { EstacionCocina } from "./estacionCocina";
import { PlatoPedido } from "../platoPedido/platoPedido";

/**
 * Registra estaciones y dirige los platos a la cadena de cocina.
 */
export class RegistroEstaciones {
    private primeraEstacion: EstacionCocina | null = null;
    private estacionesRegistradas: EstacionCocina[] = [];

    /**
     * Registra una estación y la enlaza al final de la cadena.
     *
     * @param estacion Estación que se incorpora a la cadena.
     */
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


    /**
     * Verifica que todos los platos tengan alguna estación disponible.
     *
     * @param platos Platos que se deben validar.
     * @throws Error si no hay estaciones o alguna categoría no puede atenderse.
     */
    public validarPlatos(platos: PlatoPedido[]): void {
        if (!this.primeraEstacion) {
        throw new Error("No hay estaciones de cocina configuradas en el sistema.");
        }

        for (const platoPedido of platos) {
            if (!this.primeraEstacion.puedeProcesarPlato(platoPedido)) {
            throw new Error("Ninguna estación puede procesar este tipo de plato.");
            }
        }
}


    /**
     * Envía el plato a la primera estación de la cadena.
     *
     * @param platoPedido Plato del pedido a evaluar o procesar.
     * @throws Error si no hay estaciones registradas o ninguna acepta el plato.
     */
    public derivarPlato(platoPedido: PlatoPedido): void {
        if (!this.primeraEstacion) {
            throw new Error("No hay estaciones de cocina configuradas en el sistema.");
        }
        this.primeraEstacion.procesarPlato(platoPedido);
    }

    /**
     * Devuelve la lista de estaciones registradas.
     * @returns Lista de estaciones registradas.
     */
    public getEstaciones(): EstacionCocina[] {
        return this.estacionesRegistradas;
    }
}