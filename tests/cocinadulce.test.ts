import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { CocinaDulce } from "../src/tiposCocina/cocinaDulce"; // Ajustá la ruta según corresponda
import { PlatoPedido } from "../src/platoPedido/platoPedido";
import { Plato } from "../src/iplatomenu/plato";

describe("Test de la clase CocinaDulce (Template Method Pattern)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();
    let platoMock: DeepMockProxy<Plato> = mockDeep<Plato>();

    it("Debe retornar true si la categoría del plato coincide con la categoría atendida", () => {
        const estacion = new CocinaDulce("Postres");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getCategoria.mockReturnValue("Postres");

        const resultado = (estacion as any).puedeManejarPlato(platoPedidoMock);

        expect(resultado).toBe(true);
    });

    it("Debe retornar false si la categoría del plato no coincide con la categoría atendida", () => {
        const estacion = new CocinaDulce("Postres");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getCategoria.mockReturnValue("Principales");

        const resultado = (estacion as any).puedeManejarPlato(platoPedidoMock);

        expect(resultado).toBe(false);
    });

    it("Debe agregar el plato a los asignados y mostrar el mensaje en consola", () => {
        const estacion = new CocinaDulce("Postres");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getNombre.mockReturnValue("Tiramisú");

        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        (estacion as any).agregarPlato(platoPedidoMock);

        expect(consoleSpy).toHaveBeenCalledWith("[Cocina Dulce] Preparando plato: Tiramisú");
        expect((estacion as any).platosAsignados).toContain(platoPedidoMock);

        consoleSpy.mockRestore();
    });

});