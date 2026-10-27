import { describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { PedidoEnConstruccion } from "../src/pedido/pedidoenconstruccion";
import { Pedido } from "../src/pedido/pedido";
import { IPlatoMenu } from "../src/iplatomenu/iplatomenu";
import { PedidoConfirmado } from "../src/pedido/pedidoconfirmado";

describe("Test de la clase PedidoEnConstruccion (State Pattern)", () => {

    let estadoEnConstruccion: PedidoEnConstruccion = new PedidoEnConstruccion();
    let pedidoMock: DeepMockProxy<Pedido> = mockDeep<Pedido>();
    let platoMenuMock: DeepMockProxy<IPlatoMenu> = mockDeep<IPlatoMenu>();

    it("Debe permitir agregar un plato delegando en el pedido", () => {
        estadoEnConstruccion.agregarPlato(pedidoMock, platoMenuMock);

        expect(pedidoMock.agregarPlatoAlHistorialYCocina).toHaveBeenCalledWith(platoMenuMock);
        expect(pedidoMock.agregarPlatoAlHistorialYCocina).toHaveBeenCalledTimes(1);
    });

    it("Debe permitir quitar un plato delegando en el pedido", () => {
        estadoEnConstruccion.quitarPlato(pedidoMock, platoMenuMock);

        expect(pedidoMock.removerPlatoDelPedido).toHaveBeenCalledWith(platoMenuMock);
        expect(pedidoMock.removerPlatoDelPedido).toHaveBeenCalledTimes(1);
    });

    it("Debe confirmar el pedido cambiando su estado a PedidoConfirmado", () => {
        estadoEnConstruccion.confirmar(pedidoMock);

        // Verifica que se haya llamado al método de cambiar estado pasando una instancia de PedidoConfirmado
        expect(pedidoMock.cambiarEstadoPedido).toHaveBeenCalledTimes(1);
        const estadoPasado = pedidoMock.cambiarEstadoPedido.mock.calls[0][0];
        expect(estadoPasado).toBeInstanceOf(PedidoConfirmado);
    });

    it("No debe permitir facturar mientras el pedido está en construcción (retorna false)", () => {
        const resultado = estadoEnConstruccion.estaListoParaFacturar(pedidoMock);

        expect(resultado).toBe(false);
    });

});