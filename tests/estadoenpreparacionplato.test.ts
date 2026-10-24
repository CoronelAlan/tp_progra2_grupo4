import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { EstadoEnPreparacionPlato } from "../src/platoPedido/enPreparacion"; // Ajustá la ruta según corresponda
import { PlatoPedido } from "../src/platoPedido/platoPedido";
import { EstadoListoPlato } from "../src/platoPedido/estadolistoplato";

describe("Test de la clase EstadoEnPreparacionPlato (State Pattern)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();

    it("Debe lanzar un error si se intenta pasar a preparación un plato que ya está en preparación", () => {
        const estado = new EstadoEnPreparacionPlato();

        expect(() => {
            estado.pasarAPreparacion(platoPedidoMock);
        }).toThrow("El plato ya esta en preparación");
    });

    it("Debe cambiar el estado a EstadoListoPlato al marcarlo como listo", () => {
        const estado = new EstadoEnPreparacionPlato();
        
        // Espiamos el console.log para que no ensucie la consola durante los tests
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        estado.marcarListo(platoPedidoMock);

        // Verifica que se haya cambiado el estado en el platoPedido
        expect(platoPedidoMock.setEstado).toHaveBeenCalledWith(expect.any(EstadoListoPlato));

        consoleSpy.mockRestore();
    });

    it("Debe retornar false en estaListo y en puedeModificarse", () => {
        const estado = new EstadoEnPreparacionPlato();

        expect(estado.estaListo()).toBe(false);
        expect(estado.puedeModificarse()).toBe(false);
    });

});