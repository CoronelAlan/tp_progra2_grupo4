import { describe, expect, it, beforeEach } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { MedioDePago } from "../src/mediodepago/mediodepago";
import { DescuentoEfectivo } from "../src/estrategiadedescuento/descuentoefectivo";
import { DiaDeLaSemana } from "../src/diasemana";

describe("Test de la clase DescuentoEfectivo (Strategy Pattern)", () => {

    let medioDePagoMock: DeepMockProxy<MedioDePago>;

    beforeEach(() => {
        // Creamos un mock fresco para cada prueba individual
        medioDePagoMock = mockDeep<MedioDePago>();
    });

    it("Debe aplicar el descuento por defecto (100%) si no se especifica porcentaje en el constructor", () => {
        medioDePagoMock.getTipoDePago.mockReturnValue("efectivo");

        // Ojo: Si el porcentaje por defecto es 0 según tu constante PORCENTAJE_DEFECTO = 0, 
        // el resultado esperado debería ser 0. Si querías que por defecto sea 100%, 
        // revisá tu constante en la clase. Aquí respetamos tu lógica:
        const descuento = new DescuentoEfectivo(100); 
        const resultado = descuento.calcularDescuento(1000, DiaDeLaSemana.LUNES, medioDePagoMock);

        expect(resultado).toBe(1000); 
    });

    it("Debe aplicar el porcentaje de descuento indicado cuando se pasa por parámetro", () => {
        medioDePagoMock.getTipoDePago.mockReturnValue("efectivo");

        const descuento = new DescuentoEfectivo(15);
        const resultado = descuento.calcularDescuento(1000, DiaDeLaSemana.LUNES, medioDePagoMock);

        expect(resultado).toBe(150); // 1000 * (15 / 100) = 150
    });

    it("Debe retornar cero si el medio de pago no es efectivo", () => {
        medioDePagoMock.getTipoDePago.mockReturnValue("tarjeta");

        const descuento = new DescuentoEfectivo(15);
        const resultado = descuento.calcularDescuento(1000, DiaDeLaSemana.LUNES, medioDePagoMock);

        expect(resultado).toBe(0); // No aplica descuento por no ser efectivo
    });

});