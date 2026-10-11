import  {ItipoPedido} from "./ItipoPedido"  
export class PedidoEnvio implements ItipoPedido {
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

    public calcularEnvio(costoEnvio : number) : number{
        return costoEnvio;
    }

    public getDireccion() : string {
        return this.direccion;
    }


}