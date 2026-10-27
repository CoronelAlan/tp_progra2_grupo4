import { describe, expect, it } from "@jest/globals";
import { Plato } from "../src/iplatoMenu/plato";

describe("Test de la clase Plato", () => {

    it("Debe crearse correctamente y retornar sus propiedades con los getters", () => {
        const plato = new Plato("Milanesa con Fritas", 1500, "Principal");

        expect(plato.getNombre()).toBe("Milanesa con Fritas");
        expect(plato.calcularPrecio()).toBe(1500);
        expect(plato.getCategoria()).toBe("Principal");
    });

    it("Debe retornar un array con sí mismo al invocar obtenerPlatos", () => {
        const plato = new Plato("Flan", 600, "Postre");
        const platosObtenidos = plato.obtenerPlatos();

        expect(platosObtenidos).toHaveLength(1);
        expect(platosObtenidos[0]).toBe(plato);
    });

});