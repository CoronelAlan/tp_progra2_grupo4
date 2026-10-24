import { describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { EstadoListoPlato } from "../src/platoPedido/estadolistoplato"; // Ajustá la ruta según corresponda
import { PlatoPedido } from "../src/platoPedido/platoPedido";

describe("Test de la clase EstadoListoPlato (State Pattern)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();

    it("Debe lanzar un error si se intenta pasar a preparación un plato que ya está listo", () => {
        const estado = new EstadoListoPlato();

        expect(() => {
            estado.pasarAPreparacion(platoPedidoMock);
        }).toThrow("No se puede enviar a preparación un plato que ya está listo");
    });

    it("Debe lanzar un error si se intenta marcar como listo un plato que ya está listo", () => {
        const estado = new EstadoListoPlato();

        expect(() => {
            estado.marcarListo(platoPedidoMock);
        }).toThrow("El plato ya esta listo");
    });

    it("Debe retornar true en estaListo y false en puedeModificarse", () => {
        const estado = new EstadoListoPlato();

        expect(estado.estaListo()).toBe(true);
        expect(estado.puedeModificarse()).toBe(false);
    });

});