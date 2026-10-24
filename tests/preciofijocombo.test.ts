import { describe, expect, it } from "@jest/globals";
import { PrecioFijoCombo } from "../src/iestrategiabeneficio/precioFijoCombo";

describe("Test de la clase PrecioFijoCombo (Strategy Pattern)", () => {

    it("Debe retornar siempre el precio fijo configurado, ignorando el precio base", () => {
        const precioFijo = 1500;
        const beneficio = new PrecioFijoCombo(precioFijo);

        // Le pasamos cualquier precio base (ej. 3000)
        const resultado = beneficio.calcular(3000);

        expect(resultado).toBe(1500);
    });

});