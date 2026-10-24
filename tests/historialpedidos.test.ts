import { describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { HistorialPedidos } from "../src/historialPedidos"; // Ajustá la ruta según corresponda
import { Pedido } from "../src/pedido/pedido";
import { ITipoPedido } from "../src/tipoPedido/ItipoPedido";

describe("Test de la clase HistorialPedidos", () => {

    let pedidoMock1: DeepMockProxy<Pedido> = mockDeep<Pedido>();
    let pedidoMock2: DeepMockProxy<Pedido> = mockDeep<Pedido>();
    let tipoPedidoMock1: DeepMockProxy<ITipoPedido> = mockDeep<ITipoPedido>();
    let tipoPedidoMock2: DeepMockProxy<ITipoPedido> = mockDeep<ITipoPedido>();

    it("Debe inicializarse correctamente con un array inicial de pedidos", () => {
        const historial = new HistorialPedidos([pedidoMock1]);

        const pedidos = historial.getPedidosFinalizados();
        expect(pedidos).toHaveLength(1);
        expect(pedidos).toContain(pedidoMock1);
    });

    it("Debe registrar un nuevo pedido correctamente en el historial", () => {
        const historial = new HistorialPedidos([]);

        historial.registrarPedido(pedidoMock1);

        expect(historial.getPedidosFinalizados()).toHaveLength(1);
        expect(historial.getPedidosFinalizados()).toContain(pedidoMock1);
    });

    it("Debe retornar una copia del array de pedidos finalizados para proteger el encapsulamiento", () => {
        const historial = new HistorialPedidos([pedidoMock1]);

        const pedidos1 = historial.getPedidosFinalizados();
        const pedidos2 = historial.getPedidosFinalizados();

        expect(pedidos1).not.toBe(pedidos2); // Distinta referencia (copia)
        expect(pedidos1).toEqual(pedidos2);  // Mismo contenido
    });

    it("Debe buscar y filtrar correctamente los pedidos por el tipo de descripción", () => {
        const historial = new HistorialPedidos([pedidoMock1, pedidoMock2]);

        // Configuramos los mocks de los tipos de pedido
        pedidoMock1.getTipoPedido.mockReturnValue(tipoPedidoMock1);
        tipoPedidoMock1.getDescripcion.mockReturnValue("Pedido en el salon, mesa: 5");

        pedidoMock2.getTipoPedido.mockReturnValue(tipoPedidoMock2);
        tipoPedidoMock2.getDescripcion.mockReturnValue("Pedido para envio, direccion: Av. Corrientes 1234");

        const resultados = historial.buscarPorTipo("Pedido en el salon, mesa: 5");

        expect(resultados).toHaveLength(1);
        expect(resultados).toContain(pedidoMock1);
        expect(resultados).not.toContain(pedidoMock2);
    });

    it("Debe retornar un array vacío si ningún pedido coincide con la descripción buscada", () => {
        const historial = new HistorialPedidos([pedidoMock1]);

        pedidoMock1.getTipoPedido.mockReturnValue(tipoPedidoMock1);
        tipoPedidoMock1.getDescripcion.mockReturnValue("Pedido para retirar, horario: 21:00");

        const resultados = historial.buscarPorTipo("Descripción Inexistente");

        expect(resultados).toEqual([]);
    });

});