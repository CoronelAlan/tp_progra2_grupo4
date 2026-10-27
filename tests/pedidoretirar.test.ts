import { describe, expect, it } from "@jest/globals";
import { PedidoRetirar } from "../src/tipoPedido/pedidoRetirar"; // Ajustá la ruta según corresponda

describe("Test de la clase PedidoRetirar", () => {

    it("Debe inicializarse correctamente y retornar el horario de retiro", () => {
        const pedido = new PedidoRetirar("20:30 hs");

        expect(pedido.getHorarioRetiro()).toBe("20:30 hs");
    });

    it("Debe retornar la descripción formateada correctamente", () => {
        const pedido = new PedidoRetirar("20:30 hs");

        expect(pedido.getDescripcion()).toBe("Pedido para retirar, horario: 20:30 hs");
    });

    it("Debe retornar el costo adicional correspondiente (cero)", () => {
        const pedido = new PedidoRetirar("20:30 hs");

        expect(pedido.calcularCostoAdicional()).toBe(0);
    });

});