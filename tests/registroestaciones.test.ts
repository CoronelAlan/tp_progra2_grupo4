import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { RegistroEstaciones } from "../src/tiposCocina/registroEstaciones"; // Ajustá la ruta según corresponda
import { EstacionCocina } from "../src/tiposCocina/estacionCocina";
import { PlatoPedido } from "../src/platoPedido/platoPedido";

// Creamos un Stub de EstacionCocina para simular el comportamiento en las pruebas
class EstacionStub extends EstacionCocina {
    public procesarPlatoMock = jest.fn();

    protected puedeManejarPlato(_platoPedido: PlatoPedido): boolean {
        return true;
    }
    protected agregarPlato(_platoPedido: PlatoPedido): void {}

    public procesarPlato(platoPedido: PlatoPedido): void {
        this.procesarPlatoMock(platoPedido);
    }
}

describe("Test de la clase RegistroEstaciones (Chain of Responsibility Manager)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();

    it("Debe inicializarse vacío y sin estaciones registradas", () => {
        const registro = new RegistroEstaciones();

        expect(registro.getEstaciones()).toEqual([]);
        expect(() => {
            registro.derivarPlato(platoPedidoMock);
        }).toThrow("No hay estaciones de cocina configuradas en el sistema.");
    });

    it("Debe registrar la primera estación correctamente y asignarla como inicial", () => {
        const registro = new RegistroEstaciones();
        const estacion1 = new EstacionStub("Entradas");

        registro.registrarEstacion(estacion1);

        expect(registro.getEstaciones()).toContain(estacion1);
        expect((registro as any).primeraEstacion).toBe(estacion1);
    });

    it("Debe encadenar correctamente múltiples estaciones agregadas de forma sucesiva", () => {
        const registro = new RegistroEstaciones();
        const estacion1 = new EstacionStub("Entradas");
        const estacion2 = new EstacionStub("Principales");
        const estacion3 = new EstacionStub("Postres");

        registro.registrarEstacion(estacion1);
        registro.registrarEstacion(estacion2);
        registro.registrarEstacion(estacion3);

        const estaciones = registro.getEstaciones();
        expect(estaciones).toHaveLength(3);
        expect(estaciones).toEqual([estacion1, estacion2, estacion3]);

        // Verificamos que se haya enlazado el 'siguienteEstacion' correctamente
        expect((estacion1 as any).siguienteEstacion).toBe(estacion2);
        expect((estacion2 as any).siguienteEstacion).toBe(estacion3);
        expect((estacion3 as any).siguienteEstacion).toBeNull();
    });

    it("Debe derivar el plato correctamente llamando a procesarPlato de la primera estación", () => {
        const registro = new RegistroEstaciones();
        const estacion1 = new EstacionStub("Entradas");

        registro.registrarEstacion(estacion1);
        registro.derivarPlato(platoPedidoMock);

        expect(estacion1.procesarPlatoMock).toHaveBeenCalledWith(platoPedidoMock);
    });

});