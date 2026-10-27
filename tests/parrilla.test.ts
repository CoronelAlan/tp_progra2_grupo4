import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { Parrilla } from "../src/tiposCocina/parrilla"; // Ajustá la ruta según corresponda
import { PlatoPedido } from "../src/platoPedido/platoPedido";
import { Plato } from "../src/iplatomenu/plato";

describe("Test de la clase Parrilla (Template Method Pattern)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();
    let platoMock: DeepMockProxy<Plato> = mockDeep<Plato>();

    it("Debe retornar true si la categoría del plato coincide con la categoría atendida", () => {
        const estacion = new Parrilla("Carnes");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getCategoria.mockReturnValue("Carnes");

        const resultado = (estacion as any).puedeManejarPlato(platoPedidoMock);

        expect(resultado).toBe(true);
    });

    it("Debe retornar false si la categoría del plato no coincide con la categoría atendida", () => {
        const estacion = new Parrilla("Carnes");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getCategoria.mockReturnValue("Ensaladas");

        const resultado = (estacion as any).puedeManejarPlato(platoPedidoMock);

        expect(resultado).toBe(false);
    });

    it("Debe agregar el plato a los asignados y mostrar el mensaje en consola", () => {
        const estacion = new Parrilla("Carnes");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getNombre.mockReturnValue("Bife de Chorizo");

        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        (estacion as any).agregarPlato(platoPedidoMock);

        expect(consoleSpy).toHaveBeenCalledWith("[Parrilla] Preparando plato: Bife de Chorizo");
        expect((estacion as any).platosAsignados).toContain(platoPedidoMock);

        consoleSpy.mockRestore();
    });

});