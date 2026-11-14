
/**
 * Abstracción de un medio de pago y su forma de procesar un importe.
 */
export abstract class MedioDePago {

  private tipoDePago: string;

  /**
   * Configura el nombre del medio de pago.
   *
   * @param tipoPago Nombre del medio de pago.
   */
  public constructor(tipoPago:string) {
    this.tipoDePago = tipoPago;
  }

   /**
    * Devuelve el monto recibido, sin recargos.
    *
    * @param monto Importe del pago.
    * @returns Monto recibido, sin modificación.
    */
   public pagar(monto: number): number {
     return monto;
}

  /**
   * Devuelve la descripción del medio de pago.
   * @returns Nombre del medio de pago.
   */
  public getTipoDePago():string {
    return this.tipoDePago
  }
}