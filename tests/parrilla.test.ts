import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { Parrilla } from "../src/tiposCocina/parrilla"; // Ajustá la ruta según corresponda
import { PlatoPedido } from "../src/platoPedido/platoPedido";
import { Plato } from "../src/iplatomenu/plato";

describe("Test de la clase Parrilla (Template Method Pattern)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();
    let platoMock: DeepMockProxy<Plato> = mockDeep<Plato>();

    it("Debe procesar y aceptar el plato si la categoría coincide con la atendida", () => {
        const estacion = new Parrilla("Carnes");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getCategoria.mockReturnValue("Carnes");
        platoMock.getNombre.mockReturnValue("Bife de Chorizo");

        const consoleSpy = jest.spyOn(console, "log").mockImplementation(() => {});

        
        estacion.procesarPlato(platoPedidoMock);

        expect(consoleSpy).toHaveBeenCalledWith("[Parrilla] Preparando plato: Bife de Chorizo");
        
        consoleSpy.mockRestore();
    });

    it("Debe lanzar un error si el plato no coincide con la categoría y no hay otra estación en la cadena", () => {
        const estacion = new Parrilla("Carnes");

        platoPedidoMock.getPlato.mockReturnValue(platoMock);
        platoMock.getCategoria.mockReturnValue("Ensaladas");

        
        expect(() => {
            estacion.procesarPlato(platoPedidoMock);
        }).toThrow("Ninguna estación puede procesar este tipo de plato.");
    });

});