import { describe, expect, it } from "@jest/globals";
import { DescuentoEfectivo } from "../src/estrategiadedescuento/descuentoefectivo";

describe("Test de la clase DescuentoEfectivo (Strategy Pattern)", () => {

    it("Debe aplicar el descuento por defecto (100%) si no se especifica porcentaje en el constructor", () => {
        const descuento = new DescuentoEfectivo();
        const resultado = descuento.calcularDescuento(1000);

        expect(resultado).toBe(1000); // 1000 * (100 / 100) = 1000
    });

    it("Debe aplicar el porcentaje de descuento indicado cuando se pasa por parámetro", () => {
        // Creamos un descuento del 15%
        const descuento = new DescuentoEfectivo(15);
        const resultado = descuento.calcularDescuento(1000);

        expect(resultado).toBe(150); // 1000 * (15 / 100) = 150
    });

});