import { describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { DescuentoDiaEspecial } from "../src/estrategiadedescuento/descuentodiaespecial";
import { DiaDeLaSemana } from "../src/diasemana";
import { MedioDePago } from "../src/mediodepago/mediodepago";

describe("Test de la clase DescuentoDiaEspecial (Strategy Pattern)", () => {

    // Creamos un mock del medio de pago para pasarlo como tercer argumento obligatorio
    const medioDePagoMock = mockDeep<MedioDePago>();

    it("Debe calcular el descuento correctamente si el día coincide", () => {
        // Creamos una estrategia con 20% de descuento para el día LUNES
        const descuento = new DescuentoDiaEspecial(20, DiaDeLaSemana.LUNES);
        
        // Aplicamos el descuento sobre un total de 1000 en día LUNES pasándole el medio de pago requerido
        const resultado = descuento.calcularDescuento(1000, DiaDeLaSemana.LUNES, medioDePagoMock);

        expect(resultado).toBe(200); // 1000 * (20 / 100) = 200
    });

    it("Debe retornar cero si el día no coincide con el del descuento", () => {
        // Estrategia válida solo para LUNES
        const descuento = new DescuentoDiaEspecial(20, DiaDeLaSemana.LUNES);
        
        // Intentamos aplicarlo un MARTES pasándole el medio de pago requerido
        const resultado = descuento.calcularDescuento(1000, DiaDeLaSemana.MARTES, medioDePagoMock);

        expect(resultado).toBe(0);
    });

});