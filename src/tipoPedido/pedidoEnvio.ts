import  {ITipoPedido} from "./ItipoPedido"  
/**
 * Modalidad de pedido con dirección y costo de envío.
 */
export class PedidoEnvio implements ITipoPedido {
    private direccion : string;
    private costoEnvio: number;

    /**
     * Crea una modalidad de envío con dirección y costo.
     *
     * @param direccion Dirección de entrega.
     * @param costoEnvio Costo del envío.
     */
    public constructor(direccion: string, costoEnvio: number) {
        this.costoEnvio = costoEnvio;
        this.direccion = direccion;
    }

    /**
     * Devuelve el costo del envío.
     * @returns Costo configurado del envío.
     */
    public calcularCostoAdicional(): number {
        
      return this.costoEnvio
    }
    /**
     * Devuelve una descripción del pedido con envío.
     * @returns Descripción con la dirección de envío.
     */
    public getDescripcion(): string {
        return `Pedido para envio, direccion: ${this.direccion}`;
    }

    /**
     * Suma otro importe al costo de envío configurado.
     *
     * @param costoEnvio Costo del envío.
     * @returns Suma de ambos importes de envío.
     */
    public calcularEnvio(costoEnvio : number) : number {
        const costoTotal = this.costoEnvio + costoEnvio;
        return costoTotal;
    }

    /**
     * Devuelve la dirección de entrega.
     * @returns Dirección de entrega.
     */
    public getDireccion() : string {
        return this.direccion;
    }


}