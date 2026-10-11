import { EstacionCocina } from "./estacionCocina";

export default class RegistroEstaciones {
    private estaciones: Map <string, EstacionCocina>

    public constructor(_estaciones: Map <string, EstacionCocina>) {
        this.estaciones = _estaciones;
    }

    public registrar(_tipo: string, _estacion: EstacionCocina): void {
        this.estaciones.set(_tipo, _estacion);
    }

    public obtener(tipo: string): EstacionCocina {
        const estacion = this.estaciones.get(tipo);

        if (!estacion) {
            throw new Error("No existe una estación para ese tipo");
        }

        return estacion;
    }
}