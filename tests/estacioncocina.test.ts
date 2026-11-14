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
    this.platosAsignados.push(platoPedido);
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


    it("Debe indicar que puede procesar un plato si la estación lo acepta", () => {
        const estacion = new EstacionCocinaTestStub("Entradas");
        estacion.puedeManejarPlatoMock.mockReturnValue(true);

        expect(estacion.puedeProcesarPlato(platoPedidoMock)).toBe(true);
        expect(estacion.agregarPlatoMock).not.toHaveBeenCalled();
    });

    it("Debe consultar a la siguiente estación si no puede procesar el plato", () => {
        const estacion1 = new EstacionCocinaTestStub("Entradas");
        const estacion2 = new EstacionCocinaTestStub("Principales");

        estacion1.puedeManejarPlatoMock.mockReturnValue(false);
        estacion2.puedeManejarPlatoMock.mockReturnValue(true);

        estacion1.setSiguiente(estacion2);

        expect(estacion1.puedeProcesarPlato(platoPedidoMock)).toBe(true);
        expect(estacion2.puedeManejarPlatoMock).toHaveBeenCalledWith(platoPedidoMock);
        expect(estacion1.agregarPlatoMock).not.toHaveBeenCalled();
        expect(estacion2.agregarPlatoMock).not.toHaveBeenCalled();
    });

    it("Debe indicar que no puede procesar un plato si ninguna estación lo acepta", () => {
        const estacion1 = new EstacionCocinaTestStub("Entradas");
        const estacion2 = new EstacionCocinaTestStub("Principales");

        estacion1.puedeManejarPlatoMock.mockReturnValue(false);
        estacion2.puedeManejarPlatoMock.mockReturnValue(false);

        estacion1.setSiguiente(estacion2);

        expect(estacion1.puedeProcesarPlato(platoPedidoMock)).toBe(false);
    });

    it("No debe iniciar la preparación si no hay platos pendientes", () => {
        const estacion = new EstacionCocinaTestStub("Entradas");

        expect(() => {
            estacion.iniciarSiguientePlato();
        }).toThrow("No hay platos pendientes en esta estación.");
    });

    it("Debe preparar los platos en orden FIFO", () => {
        const estacion = new EstacionCocinaTestStub("Entradas");
        const primerPlato = mockDeep<PlatoPedido>();
        const segundoPlato = mockDeep<PlatoPedido>();

        estacion.puedeManejarPlatoMock.mockReturnValue(true);

        estacion.procesarPlato(primerPlato);
        estacion.procesarPlato(segundoPlato);

        const primeroEnPreparacion = estacion.iniciarSiguientePlato();

        expect(primeroEnPreparacion).toBe(primerPlato);
        expect(primerPlato.pasarAPreparacion).toHaveBeenCalledTimes(1);
        expect(segundoPlato.pasarAPreparacion).not.toHaveBeenCalled();

        estacion.finalizarPlatoActual();

        expect(primerPlato.marcarComoListo).toHaveBeenCalledTimes(1);

        const segundoEnPreparacion = estacion.iniciarSiguientePlato();

        expect(segundoEnPreparacion).toBe(segundoPlato);
        expect(segundoPlato.pasarAPreparacion).toHaveBeenCalledTimes(1);

        estacion.finalizarPlatoActual();

        expect(segundoPlato.marcarComoListo).toHaveBeenCalledTimes(1);
    });

    it("No debe iniciar otro plato mientras existe uno en preparación", () => {
        const estacion = new EstacionCocinaTestStub("Entradas");
        const primerPlato = mockDeep<PlatoPedido>();
        const segundoPlato = mockDeep<PlatoPedido>();

        estacion.puedeManejarPlatoMock.mockReturnValue(true);

        estacion.procesarPlato(primerPlato);
        estacion.procesarPlato(segundoPlato);

        estacion.iniciarSiguientePlato();

        expect(() => {
            estacion.iniciarSiguientePlato();
        }).toThrow("La estación ya tiene un plato en preparación.");

        expect(segundoPlato.pasarAPreparacion).not.toHaveBeenCalled();
    });

    it("No debe finalizar un plato si no hay ninguno en preparación", () => {
        const estacion = new EstacionCocinaTestStub("Entradas");

        expect(() => {
            estacion.finalizarPlatoActual();
        }).toThrow("No hay un plato en preparación en esta estación.");
    });

    it("No debe quitar un plato de la cola si falla el inicio de preparación", () => {
        const estacion = new EstacionCocinaTestStub("Entradas");
        const plato = mockDeep<PlatoPedido>();

        estacion.puedeManejarPlatoMock.mockReturnValue(true);

        plato.pasarAPreparacion.mockImplementationOnce(() => {
            throw new Error("No se puede iniciar la preparación.");
        });

        estacion.procesarPlato(plato);

        expect(() => {
            estacion.iniciarSiguientePlato();
        }).toThrow("No se puede iniciar la preparación.");

        expect(estacion.iniciarSiguientePlato()).toBe(plato);
        expect(plato.pasarAPreparacion).toHaveBeenCalledTimes(2);
    });

    it("No debe liberar la estación si falla la finalización del plato", () => {
        const estacion = new EstacionCocinaTestStub("Entradas");
        const plato = mockDeep<PlatoPedido>();

        estacion.puedeManejarPlatoMock.mockReturnValue(true);

        plato.marcarComoListo.mockImplementationOnce(() => {
            throw new Error("No se pudo finalizar el plato.");
        });

        estacion.procesarPlato(plato);
        estacion.iniciarSiguientePlato();

        expect(() => {
            estacion.finalizarPlatoActual();
        }).toThrow("No se pudo finalizar el plato.");

        expect(() => {
            estacion.iniciarSiguientePlato();
        }).toThrow("La estación ya tiene un plato en preparación.");

        estacion.finalizarPlatoActual();

        expect(plato.marcarComoListo).toHaveBeenCalledTimes(2);
    });


});