export class Cliente {
 private nombre : string;
 private apellido : string;
 
 public constructor(nombre: string, apellido: string) {
    this.apellido = apellido;
    this.nombre = nombre;
 }

 public agregarPedido(menu: Menu): void{};

 public terminarPedido(): pedido{};

 public pagar(pedido: Pedido, medioDePago: MedioDePago): number{};
}