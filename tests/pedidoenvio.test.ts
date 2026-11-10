import { describe, expect, it } from "@jest/globals";
import { PedidoEnvio } from "../src/tipoPedido/pedidoEnvio"; // Ajustá la ruta según corresponda

describe("Test de la clase PedidoEnvio", () => {

    it("Debe inicializarse correctamente y retornar su dirección", () => {
        const pedido = new PedidoEnvio("Av. Corrientes 1234", 500);

        expect(pedido.getDireccion()).toBe("Av. Corrientes 1234");
    });

    it("Debe retornar la descripción formateada correctamente", () => {
        const pedido = new PedidoEnvio("Av. Corrientes 1234", 500);

        expect(pedido.getDescripcion()).toBe("Pedido para envio, direccion: Av. Corrientes 1234");
    });

    it("Debe calcular el costo adicional devolviendo el costo de envío configurado", () => {
        const pedido = new PedidoEnvio("Av. Corrientes 1234", 500);
        
        expect(pedido.calcularCostoAdicional()).toBe(500);
    });

    it("Debe calcular el costo total de envío sumando el costo interno y el pasado por parámetro", () => {
        const pedido = new PedidoEnvio("Av. Corrientes 1234", 300);
        const costoTotal = pedido.calcularEnvio(200);

        expect(costoTotal).toBe(500); // 300 + 200 = 500
    });

});