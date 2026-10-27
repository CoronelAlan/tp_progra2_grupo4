import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { EstadoPendientePlato } from "../src/platoPedido/estadopendienteplato"; // Ajustá la ruta según corresponda
import { PlatoPedido } from "../src/platoPedido/platoPedido";
import { EstadoEnPreparacionPlato } from "../src/platoPedido/enPreparacion";

describe("Test de la clase EstadoPendientePlato (State Pattern)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();

    it("Debe cambiar el estado a EstadoEnPreparacionPlato al pasar a preparación", () => {
        const estado = new EstadoPendientePlato();
        
        // Espiamos el console.log para mantener limpio la salida de los tests
        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        estado.pasarAPreparacion(platoPedidoMock);

        expect(platoPedidoMock.setEstado).toHaveBeenCalledWith(expect.any(EstadoEnPreparacionPlato));

        consoleSpy.mockRestore();
    });

    it("Debe lanzar un error si se intenta marcar como listo un plato que está pendiente", () => {
        const estado = new EstadoPendientePlato();

        expect(() => {
            estado.marcarListo(platoPedidoMock);
        }).toThrow("No se puede marcar como listo, el plato todavía esta pendiente");
    });

    it("Debe retornar false en estaListo y true en puedeModificarse", () => {
        const estado = new EstadoPendientePlato();

        expect(estado.estaListo()).toBe(false);
        expect(estado.puedeModificarse()).toBe(true);
    });

});