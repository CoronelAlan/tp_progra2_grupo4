import { describe, expect, it } from "@jest/globals";
import { DescuentoPorcentual } from "../src/iestrategiaBeneficio/descuentoporcentual";

describe("Test de la clase DescuentoPorcentual (Strategy Pattern)", () => {

    it("Debe calcular correctamente el precio final aplicando un descuento porcentual", () => {
        // Creamos un descuento del 20%
        const beneficio = new DescuentoPorcentual(20);
        
        // Sobre un precio base de 1000, el 20% es 200, por lo que el precio final debe ser 800
        const resultado = beneficio.calcular(1000);

        expect(resultado).toBe(800);
    });

    it("Debe retornar el precio base intacto si el descuento es del 0%", () => {
        const beneficio = new DescuentoPorcentual(0);
        const resultado = beneficio.calcular(1000);

        expect(resultado).toBe(1000);
    });

    it("Debe retornar 0 si el descuento es del 100%", () => {
        const beneficio = new DescuentoPorcentual(100);
        const resultado = beneficio.calcular(1000);

        expect(resultado).toBe(0);
    });

});