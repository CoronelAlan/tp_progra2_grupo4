import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { CalculadoraCobro } from "../src/calcularcobro";
import { Pedido } from "../src/pedido/pedido";
import { MedioDePago } from "../src/mediodepago/mediodepago";
import { IEstrategiaDeDescuento } from "../src/estrategiadedescuento/iestrategiadescuento";
import { DiaDeLaSemana } from "../src/diasemana";

describe("Test de la clase CalcularCobro", () => {

    let pedidoMock: DeepMockProxy<Pedido> = mockDeep<Pedido>();
    let medioDePagoMock: DeepMockProxy<MedioDePago> = mockDeep<MedioDePago>();
    let descuentoMock1: DeepMockProxy<IEstrategiaDeDescuento> = mockDeep<IEstrategiaDeDescuento>();
    let descuentoMock2: DeepMockProxy<IEstrategiaDeDescuento> = mockDeep<IEstrategiaDeDescuento>();

    it("Debe permitir agregar nuevos descuentos mediante el método público y aplicarlos en el cálculo", () => {
        const calculadora = new CalculadoraCobro([descuentoMock1]);

        pedidoMock.calcularPrecioTotal.mockReturnValue(3000);
        descuentoMock1.calcularDescuento.mockReturnValue(200);
        descuentoMock2.calcularDescuento.mockReturnValue(500);
        medioDePagoMock.pagar.mockImplementation((monto) => monto);

        // Verificamos que inicialmente aplica el descuento 1
        calculadora.calcularTotal(pedidoMock, medioDePagoMock, DiaDeLaSemana.LUNES);
        expect(descuentoMock1.calcularDescuento).toHaveBeenCalled();

        // Agregamos el descuento 2 mediante el método público
        calculadora.agregarDescuento(descuentoMock2);
        
        // Limpiamos los contadores de mocks para la siguiente ejecución
        jest.clearAllMocks();
        pedidoMock.calcularPrecioTotal.mockReturnValue(3000);
        descuentoMock1.calcularDescuento.mockReturnValue(200);
        descuentoMock2.calcularDescuento.mockReturnValue(500);
        medioDePagoMock.pagar.mockImplementation((monto) => monto);

        // Al calcular de nuevo, ahora debe evaluar ambos descuentos y aplicar el mejor
        const totalFinal = calculadora.calcularTotal(pedidoMock, medioDePagoMock, DiaDeLaSemana.LUNES);

        expect(descuentoMock1.calcularDescuento).toHaveBeenCalled();
        expect(descuentoMock2.calcularDescuento).toHaveBeenCalled();
        expect(totalFinal).toBe(2500); // 3000 - 500 (el mejor descuento)
    });

    it("Debe calcular el total aplicando el mejor descuento y procesando el medio de pago", () => {
        const calculadora = new CalculadoraCobro([descuentoMock1, descuentoMock2]);

        pedidoMock.calcularPrecioTotal.mockReturnValue(5000);
        descuentoMock1.calcularDescuento.mockReturnValue(500);
        descuentoMock2.calcularDescuento.mockReturnValue(1000);
        medioDePagoMock.pagar.mockReturnValue(4000);

        const totalFinal = calculadora.calcularTotal(pedidoMock, medioDePagoMock, DiaDeLaSemana.LUNES);

        expect(pedidoMock.calcularPrecioTotal).toHaveBeenCalled();
        // Pasamos los 3 argumentos que ahora exige la interfaz actualizada
        expect(descuentoMock1.calcularDescuento).toHaveBeenCalledWith(5000, DiaDeLaSemana.LUNES, medioDePagoMock);
        expect(descuentoMock2.calcularDescuento).toHaveBeenCalledWith(5000, DiaDeLaSemana.LUNES, medioDePagoMock);
        expect(medioDePagoMock.pagar).toHaveBeenCalledWith(4000);
        expect(totalFinal).toBe(4000);
    });

    it("Debe aplicar el precio base sin descontar nada si ninguna estrategia retorna un descuento mayor a cero", () => {
        const calculadora = new CalculadoraCobro([descuentoMock1]);

        pedidoMock.calcularPrecioTotal.mockReturnValue(3000);
        descuentoMock1.calcularDescuento.mockReturnValue(0);
        medioDePagoMock.pagar.mockReturnValue(3000);

        const totalFinal = calculadora.calcularTotal(pedidoMock, medioDePagoMock, DiaDeLaSemana.MARTES);

        expect(totalFinal).toBe(3000);
        expect(medioDePagoMock.pagar).toHaveBeenCalledWith(3000);
    });

});