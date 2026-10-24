import { describe, expect, it, jest } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { CalculadoraCobro } from "../src/calcularCobro";
import { Pedido } from "../src/pedido/pedido";
import { MedioDePago } from "../src/mediodepago/mediodepago";
import { IEstrategiaDeDescuento } from "../src/estrategiadedescuento/iestrategiadescuento";
import { DiaDeLaSemana } from "../src/diasemana";

describe("Test de la clase CalculadoraCobro", () => {

    let pedidoMock: DeepMockProxy<Pedido> = mockDeep<Pedido>();
    let medioDePagoMock: DeepMockProxy<MedioDePago> = mockDeep<MedioDePago>();
    let descuentoMock1: DeepMockProxy<IEstrategiaDeDescuento> = mockDeep<IEstrategiaDeDescuento>();
    let descuentoMock2: DeepMockProxy<IEstrategiaDeDescuento> = mockDeep<IEstrategiaDeDescuento>();

    it("Debe inicializarse y permitir agregar nuevos descuentos", () => {
        const calculadora = new CalculadoraCobro([descuentoMock1]);

        expect((calculadora as any).descuentos).toContain(descuentoMock1);

        calculadora.agregarDescuento(descuentoMock2);
        expect((calculadora as any).descuentos).toContain(descuentoMock2);
    });

    it("Debe calcular el total aplicando el mejor descuento y procesando el medio de pago", () => {
        const calculadora = new CalculadoraCobro([descuentoMock1, descuentoMock2]);

        // Mock del precio base del pedido
        pedidoMock.calcularPrecioTotal.mockReturnValue(5000);

        // Simulamos que el descuento 1 ofrece un descuento menor (500) y el descuento 2 ofrece uno mayor (1000)
        descuentoMock1.calcularDescuento.mockReturnValue(500);
        descuentoMock2.calcularDescuento.mockReturnValue(1000);

        // Total con mejor descuento aplicado: 5000 - 1000 = 4000
        // Mock del pago final con tarjeta/medio de pago (ej. recargo o monto final procesado)
        medioDePagoMock.pagar.mockReturnValue(4000);

        const totalFinal = calculadora.calcularTotal(pedidoMock, medioDePagoMock, DiaDeLaSemana.LUNES);

        expect(pedidoMock.calcularPrecioTotal).toHaveBeenCalled();
        expect(descuentoMock1.calcularDescuento).toHaveBeenCalledWith(5000, DiaDeLaSemana.LUNES);
        expect(descuentoMock2.calcularDescuento).toHaveBeenCalledWith(5000, DiaDeLaSemana.LUNES);
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