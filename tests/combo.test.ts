import { describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { Combo } from "../src/iplatoMenu/combo";
import { Plato } from "../src/iplatoMenu/plato";
import { IEstrategiaBeneficio } from "../src/iestrategiabeneficio/iestrategiabeneficio";

describe("Test de la clase Combo (Composite + Strategy Pattern)", () => {

    let platoMock1: DeepMockProxy<Plato> = mockDeep<Plato>();
    let platoMock2: DeepMockProxy<Plato> = mockDeep<Plato>();
    let beneficioMock: DeepMockProxy<IEstrategiaBeneficio> = mockDeep<IEstrategiaBeneficio>();

    it("Debe calcular el precio sumando los platos y aplicando la estrategia de beneficio", () => {
        // Configuramos los precios individuales de los platos
        platoMock1.calcularPrecio.mockReturnValue(500);
        platoMock2.calcularPrecio.mockReturnValue(300); // Precio base total = 800

        // Configuramos la estrategia para que devuelva un precio con beneficio (ej. 700)
        beneficioMock.calcular.mockReturnValue(700);

        const platos = [platoMock1, platoMock2];
        const combo = new Combo("Combo Especial", platos, beneficioMock);

        const precioFinal = combo.calcularPrecio();

        // Verifica que se haya calculado el precio base sumando los platos
        expect(beneficioMock.calcular).toHaveBeenCalledWith(800);
        expect(precioFinal).toBe(700);
    });

    it("Debe retornar los platos incluidos y el nombre correctamente", () => {
        const platos = [platoMock1, platoMock2];
        const combo = new Combo("Combo Familiar", platos, beneficioMock);

        expect(combo.getNombre()).toBe("Combo Familiar");
        expect(combo.obtenerPlatos()).toEqual(platos);
        expect(combo.getPlatosIncluidos()).toEqual(platos);
    });

});