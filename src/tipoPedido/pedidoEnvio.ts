import  {ITipoPedido} from "./ItipoPedido"  
export class PedidoEnvio implements ITipoPedido {
    private direccion : string;
    private costoEnvio: number;

    public constructor(direccion: string, costoEnvio: number) {
        this.costoEnvio = costoEnvio;
        this.direccion = direccion;
    }

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