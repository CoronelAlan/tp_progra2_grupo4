import { describe, expect, it } from "@jest/globals";
import { TarjetaDeCredito } from "../src/medioDePago/tarjetadecredito";

describe("Test de la clase TarjetaDeCredito", () => {

    it("Debe aplicar el recargo correctamente si se especifica un porcentaje mayor a cero", () => {
        // Tarjeta con un 10% de recargo
        const tarjeta = new TarjetaDeCredito(10);
        const montoFinal = tarjeta.pagar(1000);

        expect(montoFinal).toBe(1100); // 1000 * (1 + 10/100) = 1100
    });

    it("Debe delegar en la superclase si no se especifica recargo o es cero", () => {
        // Tarjeta sin recargo (por defecto 0)
        const tarjeta = new TarjetaDeCredito();
        const montoFinal = tarjeta.pagar(1000);

        expect(montoFinal).toBe(1000);
    });

});