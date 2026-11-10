import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { EstacionCocina } from "../src/tiposCocina/estacionCocina";
import { PlatoPedido } from "../src/platoPedido/platoPedido";

// Creamos una subclase concreta (Stub) para poder probar la clase abstracta EstacionCocina
class EstacionCocinaTestStub extends EstacionCocina {
    public puedeManejarPlatoMock = jest.fn().mockReturnValue(false);
    public agregarPlatoMock = jest.fn();

    protected puedeManejarPlato(platoPedido: PlatoPedido): boolean {
       
        return this.puedeManejarPlatoMock(platoPedido) as boolean;
    }

    protected agregarPlato(platoPedido: PlatoPedido): void {
        this.agregarPlatoMock(platoPedido);
    }
}

describe("Test de la clase abstracta EstacionCocina (Template Method & Chain of Responsibility)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();

    it("Debe configurar y retornar la siguiente estación con setSiguiente de forma pública", () => {
        const estacion1 = new EstacionCocinaTestStub("Entradas");
        const estacion2 = new EstacionCocinaTestStub("Principales");

        const resultado = estacion1.setSiguiente(estacion2);

        // Verificamos mediante el método público que la estación encadenada es la correcta
        expect(resultado).toBe(estacion2);
    });

    it("Debe procesar el plato localmente si puede manejarlo", () => {
        const estacion = new EstacionCocinaTestStub("Entradas");
        estacion.puedeManejarPlatoMock.mockReturnValue(true);

        estacion.procesarPlato(platoPedidoMock);

        expect(estacion.puedeManejarPlatoMock).toHaveBeenCalledWith(platoPedidoMock);
        expect(estacion.agregarPlatoMock).toHaveBeenCalledWith(platoPedidoMock);
    });

    it("Debe delegar a la siguiente estación si no puede manejarlo y existe una siguiente", () => {
        const estacion1 = new EstacionCocinaTestStub("Entradas");
        const estacion2 = new EstacionCocinaTestStub("Principales");

        estacion1.puedeManejarPlatoMock.mockReturnValue(false);
        estacion2.puedeManejarPlatoMock.mockReturnValue(true);

        estacion1.setSiguiente(estacion2);

        estacion1.procesarPlato(platoPedidoMock);

        expect(estacion1.puedeManejarPlatoMock).toHaveBeenCalledWith(platoPedidoMock);
        expect(estacion1.agregarPlatoMock).not.toHaveBeenCalled();
        expect(estacion2.puedeManejarPlatoMock).toHaveBeenCalledWith(platoPedidoMock);
        expect(estacion2.agregarPlatoMock).toHaveBeenCalledWith(platoPedidoMock);
    });

    it("Debe lanzar un error si no puede manejarlo y no hay siguiente estación en la cadena", () => {
        const estacion = new EstacionCocinaTestStub("Entradas");
        estacion.puedeManejarPlatoMock.mockReturnValue(false);

        expect(() => {
            estacion.procesarPlato(platoPedidoMock);
        }).toThrow("Ninguna estación puede procesar este tipo de plato.");
    });

});