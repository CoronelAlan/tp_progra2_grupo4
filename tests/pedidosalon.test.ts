import { describe, expect, it } from "@jest/globals";
import { PedidoSalon } from "../src/tipoPedido/pedidoSalon"; // Ajustá la ruta según corresponda

describe("Test de la clase PedidoSalon", () => {

    it("Debe inicializarse correctamente y retornar el número de mesa", () => {
        const pedido = new PedidoSalon(5);

        expect(pedido.getMesa()).toBe(5);
    });

    it("Debe retornar la descripción formateada correctamente", () => {
        const pedido = new PedidoSalon(5);

        expect(pedido.getDescripcion()).toBe("Pedido en el salon, mesa: 5");
    });

    it("Debe retornar el costo adicional correspondiente (cero)", () => {
        const pedido = new PedidoSalon(5);

        expect(pedido.calcularCostoAdicional()).toBe(0);
    });

});