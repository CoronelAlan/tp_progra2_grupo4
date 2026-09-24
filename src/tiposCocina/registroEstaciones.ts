import { EstacionCocina } from "./estacionCocina";

export default class RegistroEstaciones {
    private estaciones: Map <string, EstacionCocina>

    public constructor(_estaciones: Map <string, EstacionCocina>) {
        this.estaciones = _estaciones;
    }

    public registrar(_tipo: string, _estacion: EstacionCocina): void {
        let tipo = _tipo;
        let estacion = _estacion;
    }

    public obtener(tipo: string): EstacionCocina {

    }
}