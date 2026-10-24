import { describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { PlatoPedido } from "../src/platoPedido/platoPedido";
import { Plato } from "../src/iplatomenu/plato";
import { IEstadoPlatoPedido } from "../src/platoPedido/iEstadoPlatoPedido";
import { EstadoPendientePlato } from "../src/platoPedido/estadopendienteplato";

describe("Test de la clase PlatoPedido", () => {

    let platoMock: DeepMockProxy<Plato> = mockDeep<Plato>();
    let estadoMock: DeepMockProxy<IEstadoPlatoPedido> = mockDeep<IEstadoPlatoPedido>();

    it("Debe inicializarse correctamente con EstadoPendientePlato por defecto y sus getters", () => {
        const platoPedido = new PlatoPedido(platoMock, estadoMock, "Sin cebolla");

        expect(platoPedido.getPlato()).toBe(platoMock);
        expect(platoPedido.getEstado()).toBeInstanceOf(EstadoPendientePlato);
        expect(platoPedido.getNotaEspecialPedido()).toBe("Sin cebolla");
    });

    it("Debe delegar correctamente las acciones de estado y cálculo de precio", () => {
        const platoPedido = new PlatoPedido(platoMock, estadoMock, "");

        // Cálculo de precio
        platoMock.calcularPrecio.mockReturnValue(1500);
        expect(platoPedido.calcularPrecio()).toBe(1500);

        // Cambio manual de estado y verificación de getters
        platoPedido.setEstado(estadoMock);
        expect(platoPedido.getEstado()).toBe(estadoMock);

        // Delegación de pasar a preparación
        platoPedido.pasarAPreparacion();
        expect(estadoMock.pasarAPreparacion).toHaveBeenCalledWith(platoPedido);

        // Delegación de marcar como listo
        platoPedido.marcarComoListo();
        expect(estadoMock.marcarListo).toHaveBeenCalledWith(platoPedido);

        // Delegación de consultas de estado
        estadoMock.estaListo.mockReturnValue(true);
        expect(platoPedido.estaListo()).toBe(true);

        estadoMock.puedeModificarse.mockReturnValue(false);
        expect(platoPedido.puedeModificarse()).toBe(false);
    });

});