import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { RegistroEstaciones } from "../src/tiposCocina/registroEstaciones"; // Ajustá la ruta según corresponda
import { EstacionCocina } from "../src/tiposCocina/estacionCocina";
import { PlatoPedido } from "../src/platoPedido/platoPedido";

// Creamos un Stub configurable para simular el encadenamiento de la cadena de responsabilidad
class EstacionStub extends EstacionCocina {
    public procesarPlatoMock = jest.fn();
    private categoriaAtendidaLocal: string;

    constructor(categoria: string) {
        super(categoria);
        this.categoriaAtendidaLocal = categoria;
    }

    protected puedeManejarPlato(platoPedido: PlatoPedido): boolean {
        // Permite simular qué estación maneja qué categoría
        return platoPedido.getPlato().getCategoria() === this.categoriaAtendidaLocal;
    }

    protected agregarPlato(_platoPedido: PlatoPedido): void {}

    public procesarPlato(platoPedido: PlatoPedido): void {
        if (this.puedeManejarPlato(platoPedido)) {
            this.procesarPlatoMock(platoPedido);
        } else if (this.siguienteEstacion) {
            this.siguienteEstacion.procesarPlato(platoPedido);
        } else {
            throw new Error("Ninguna estación puede procesar este tipo de plato.");
        }
    }
}

describe("Test de la clase RegistroEstaciones (Chain of Responsibility Manager)", () => {

    let platoPedidoMock: DeepMockProxy<PlatoPedido> = mockDeep<PlatoPedido>();
    let platoMock = { getCategoria: () => "Entradas" };

    it("Debe inicializarse vacío y sin estaciones registradas", () => {
        const registro = new RegistroEstaciones();

        expect(registro.getEstaciones()).toEqual([]);
        expect(() => {
            registro.derivarPlato(platoPedidoMock);
        }).toThrow("No hay estaciones de cocina configuradas en el sistema.");
    });

    it("Debe registrar la estación y permitir derivar el plato correctamente a través de la interfaz pública", () => {
        const registro = new RegistroEstaciones();
        const estacion1 = new EstacionStub("Entradas");

        registro.registrarEstacion(estacion1);

        expect(registro.getEstaciones()).toContain(estacion1);

        // Derivamos el plato y comprobamos mediante el comportamiento público que la estación lo procesó
        platoPedidoMock.getPlato.mockReturnValue(platoMock as any);
        registro.derivarPlato(platoPedidoMock);

        expect(estacion1.procesarPlatoMock).toHaveBeenCalledWith(platoPedidoMock);
    });

    it("Debe encadenar múltiples estaciones y derivar el plato a la estación correcta de la cadena", () => {
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

        // Configuramos un plato de categoría "Postres" para verificar que la cadena 
        // pasa por estacion1 y estacion2 hasta llegar y ser procesado por estacion3
        const platoPostre = { getCategoria: () => "Postres" };
        platoPedidoMock.getPlato.mockReturnValue(platoPostre as any);

        registro.derivarPlato(platoPedidoMock);

        expect(estacion1.procesarPlatoMock).not.toHaveBeenCalled();
        expect(estacion2.procesarPlatoMock).not.toHaveBeenCalled();
        expect(estacion3.procesarPlatoMock).toHaveBeenCalledWith(platoPedidoMock);
    });


    it("No debe validar platos si no hay estaciones registradas", () => {
        const registro = new RegistroEstaciones();

        expect(() => {
            registro.validarPlatos([platoPedidoMock]);
        }).toThrow("No hay estaciones de cocina configuradas en el sistema.");
    });

    it("Debe validar correctamente platos de distintas estaciones", () => {
        const registro = new RegistroEstaciones();
        const estacion1 = new EstacionStub("Entradas");
        const estacion2 = new EstacionStub("Postres");

        registro.registrarEstacion(estacion1);
        registro.registrarEstacion(estacion2);

        const platoEntrada = mockDeep<PlatoPedido>();
        const platoPostre = mockDeep<PlatoPedido>();

        platoEntrada.getPlato.mockReturnValue({
            getCategoria: () => "Entradas"
        } as any);

        platoPostre.getPlato.mockReturnValue({
            getCategoria: () => "Postres"
        } as any);

        expect(() => {
            registro.validarPlatos([platoEntrada, platoPostre]);
        }).not.toThrow();

        expect(estacion1.procesarPlatoMock).not.toHaveBeenCalled();
        expect(estacion2.procesarPlatoMock).not.toHaveBeenCalled();
    });

    it("No debe validar un pedido si alguno de sus platos no tiene estación", () => {
        const registro = new RegistroEstaciones();
        const estacion = new EstacionStub("Entradas");

        registro.registrarEstacion(estacion);

        const platoValido = mockDeep<PlatoPedido>();
        const platoInvalido = mockDeep<PlatoPedido>();

        platoValido.getPlato.mockReturnValue({
            getCategoria: () => "Entradas"
        } as any);

        platoInvalido.getPlato.mockReturnValue({
            getCategoria: () => "Bebidas"
        } as any);

        expect(() => {
            registro.validarPlatos([platoValido, platoInvalido]);
        }).toThrow("Ninguna estación puede procesar este tipo de plato.");

        expect(estacion.procesarPlatoMock).not.toHaveBeenCalled();
    });

    it("No debe derivar un plato si ninguna estación puede procesarlo", () => {
        const registro = new RegistroEstaciones();
        const estacion1 = new EstacionStub("Entradas");
        const estacion2 = new EstacionStub("Postres");

        registro.registrarEstacion(estacion1);
        registro.registrarEstacion(estacion2);

        const platoInvalido = mockDeep<PlatoPedido>();

        platoInvalido.getPlato.mockReturnValue({
            getCategoria: () => "Bebidas"
        } as any);

        expect(() => {
            registro.derivarPlato(platoInvalido);
        }).toThrow("Ninguna estación puede procesar este tipo de plato.");

        expect(estacion1.procesarPlatoMock).not.toHaveBeenCalled();
        expect(estacion2.procesarPlatoMock).not.toHaveBeenCalled();
    });


});