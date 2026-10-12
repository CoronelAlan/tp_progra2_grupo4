import { EstacionCocina } from "./estacionCocina";
import { PlatoPedido } from "../platoPedido";

export class Parrilla extends EstacionCocina {
    public constructor(_cola: Map <string, PlatoPedido>) {
        super(_cola);
    }
}