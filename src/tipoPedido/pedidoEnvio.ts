import  {ItipoPedido} from "./ItipoPedido"

export class PedidoEnvio implements ItipoPedido {
    private direccion : string;
    private costoEnvio: number;

    public constructor(direccion: string, costoEnvio: number) {
        this.costoEnvio = costoEnvio;
        this.direccion = direccion;
    }

    public calcularEnvio(costoEnvio : number) : void{}

    public getDireccion() : string {
        return this.direccion;
    }
}