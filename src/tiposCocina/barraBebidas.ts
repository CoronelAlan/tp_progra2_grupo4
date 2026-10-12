import { EstacionCocina } from "./estacionCocina";
import { PlatoPedido } from "../platoPedido";

export class BarraBebidas extends EstacionCocina {
    public constructor(_cola: Map <string, PlatoPedido>) {
        super(_cola);
    }
}