import{ describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { Pedido } from "../src/pedido/pedido";
import { Plato } from "../src/iplatomenu/plato";
import { ITipoPedido } from "../src/tipoPedido/ItipoPedido";
import { PlatoPedido } from "../src/platoPedido/platoPedido";

describe("Test de la clase Pedido", () => {

    let tipoPedidoMock: DeepMockProxy<ITipoPedido> = mockDeep<ITipoPedido>();
    let platoMock: DeepMockProxy<Plato> = mockDeep<Plato>();
    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();

    it("Debe crearse en construcción con sus platos y tipo de pedido iniciales", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        expect(pedido.getTipoPedido()).toBe(tipoPedidoMock);
        expect(pedido.getPlatosCocina()).toEqual([]);
    });

    it("Debe permitir agregar un plato al pedido en construcción", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        
        platoMock.obtenerPlatos.mockReturnValue([platoMock]);
        pedido.agregarPlato(platoMock);

        expect(pedido.getPlatosCocina().length).toBe(1);
    });

    it("Debe permitir deshacer la última modificación (Memento/Undo)", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        platoMock.obtenerPlatos.mockReturnValue([platoMock]);

        pedido.agregarPlato(platoMock);
        expect(pedido.getPlatosCocina().length).toBe(1);

        pedido.deshacerUltimaModificacion();
        expect(pedido.getPlatosCocina().length).toBe(0);
    });

    it("Debe calcular correctamente el precio total sumando platos y costo adicional", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        platoMock.obtenerPlatos.mockReturnValue([platoMock]);
        
        platoMock.calcularPrecio.mockReturnValue(4000);
        tipoPedidoMock.calcularCostoAdicional.mockReturnValue(500);

        pedido.agregarPlato(platoMock);

        expect(pedido.calcularPrecioTotal()).toBe(4500);
    });

    it("No debe permitir facturar si hay platos pendientes", () => {
        platoPedidoMock.estaListo.mockReturnValue(false);
        const pedido = new Pedido([platoPedidoMock], tipoPedidoMock);

        expect(pedido.estaListoParaFacturar()).toBe(false);
    });

    it("Debe permitir facturar si todos los platos están listos y el pedido está confirmado", () => {
        platoPedidoMock.estaListo.mockReturnValue(true);
        const pedido = new Pedido([platoPedidoMock], tipoPedidoMock);
        
        // Lo confirmamos para que el estado permita evaluar los platos
        pedido.confirmarPedido();

        expect(pedido.estaListoParaFacturar()).toBe(true);
    });

    it("Una vez confirmado el pedido, no debe permitir agregar nuevos platos", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        pedido.confirmarPedido();

        expect(() => {
            pedido.agregarPlato(platoMock);
        }).toThrow();
    });

});