import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { CocinaFria } from "../src/tiposCocina/cocinaFria"; // Ajustá la ruta según corresponda
import { PlatoPedido } from "../src/platoPedido/platoPedido";
import { Plato } from "../src/iplatomenu/plato";

describe("Test de la clase CocinaFria (Template Method Pattern)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();
    let platoMock: DeepMockProxy<Plato> = mockDeep<Plato>();

    it("Debe retornar true si la categoría del plato coincide con la categoría atendida", () => {
        const estacion = new CocinaFria("Frios");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getCategoria.mockReturnValue("Frios");

        const resultado = (estacion as any).puedeManejarPlato(platoPedidoMock);

        expect(resultado).toBe(true);
    });

    it("Debe retornar false si la categoría del plato no coincide con la categoría atendida", () => {
        const estacion = new CocinaFria("Frios");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getCategoria.mockReturnValue("Calientes");

        const resultado = (estacion as any).puedeManejarPlato(platoPedidoMock);

        expect(resultado).toBe(false);
    });

    it("Debe agregar el plato a los asignados y mostrar el mensaje en consola", () => {
        const estacion = new CocinaFria("Frios");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getNombre.mockReturnValue("Ensalada César");

        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        (estacion as any).agregarPlato(platoPedidoMock);

        expect(consoleSpy).toHaveBeenCalledWith("[Cocina Fría] Preparando plato: Ensalada César");
        expect((estacion as any).platosAsignados).toContain(platoPedidoMock);

        consoleSpy.mockRestore();
    });

});