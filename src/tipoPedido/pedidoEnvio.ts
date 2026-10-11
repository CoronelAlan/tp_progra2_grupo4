import  {ItipoPedido} from "./ItipoPedido"  
export class PedidoEnvio implements ItipoPedido {
    private direccion : string;
    private costoEnvio: number;

    public constructor(direccion: string, costoEnvio: number) {
        this.costoEnvio = costoEnvio;
        this.direccion = direccion;
    }
    // eslint-disable-next-line @typescript-eslint/class-methods-use-this
    public calcularCostoAdicional(): number {
        
        throw new Error("Method not implemented.");
    }
    public getDescripcion(): string {
        return `Pedido para envio, direccion: ${this.direccion}`;
    }

    public calcularEnvio(costoEnvio : number) : number {
        const costoTotal = this.costoEnvio + costoEnvio;
        return costoTotal;
    }

    public getDireccion() : string {
        return this.direccion;
    }


}