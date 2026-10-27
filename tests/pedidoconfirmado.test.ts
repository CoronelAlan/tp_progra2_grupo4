import { describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { PedidoConfirmado } from "../src/pedido/pedidoconfirmado";
import { Pedido } from "../src/pedido/pedido";
import { IPlatoMenu } from "../src/iplatomenu/iplatomenu";

describe("Test de la clase PedidoConfirmado (State Pattern)", () => {

    let estadoConfirmado: PedidoConfirmado = new PedidoConfirmado();
    let pedidoMock: DeepMockProxy<Pedido> = mockDeep<Pedido>();
    let platoMenuMock: DeepMockProxy<IPlatoMenu> = mockDeep<IPlatoMenu>();

    it("Debe lanzar un Error al intentar agregar un plato en estado confirmado", () => {
        expect(() => {
            estadoConfirmado.agregarPlato(pedidoMock, platoMenuMock);
        }).toThrow("No se puede modificar un pedido confirmado.");
    });

    it("Debe lanzar un Error al intentar quitar un plato en estado confirmado", () => {
        expect(() => {
            estadoConfirmado.quitarPlato(pedidoMock, platoMenuMock);
        }).toThrow("No se puede modificar un pedido confirmado.");
    });

    it("Debe lanzar un Error al intentar volver a confirmar un pedido ya confirmado", () => {
        expect(() => {
            estadoConfirmado.confirmar(pedidoMock);
        }).toThrow("El pedido ya se encuentra confirmado.");
    });

    it("Debe verificar si está listo para facturar consultando al pedido", () => {
        // Configuramos el mock para que devuelva true
        pedidoMock.verificarPlatosListosParaFacturar.mockReturnValue(true);

        const resultado = estadoConfirmado.estaListoParaFacturar(pedidoMock);

        expect(resultado).toBe(true);
        expect(pedidoMock.verificarPlatosListosParaFacturar).toHaveBeenCalledTimes(1);
    });

});