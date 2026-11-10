
export abstract class MedioDePago {

  private tipoDePago: string;

  public constructor(tipoPago:string) {
    this.tipoDePago = tipoPago;
  }

   public pagar(monto: number): number {
     return monto;
}

  public getTipoDePago():string {
    return this.tipoDePago
  }
}