import { describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { Menu } from "../src/menu"; // Ajustá la ruta según corresponda
import { IPlatoMenu } from "../src/iplatomenu/iplatomenu";

describe("Test de la clase Menu (Composite Pattern Container)", () => {

    let itemMenuMock1: DeepMockProxy<IPlatoMenu> = mockDeep<IPlatoMenu>();
    let itemMenuMock2: DeepMockProxy<IPlatoMenu> = mockDeep<IPlatoMenu>();

    it("Debe inicializarse correctamente con un array inicial de platos/combos", () => {
        const menu = new Menu([itemMenuMock1]);

        expect(menu.getPlato()).toHaveLength(1);
        expect(menu.getPlato()).toContain(itemMenuMock1);
    });

    it("Debe permitir agregar nuevos elementos al menú", () => {
        const menu = new Menu([]);

        menu.agregarPlato(itemMenuMock1);

        expect(menu.getPlato()).toHaveLength(1);
        expect(menu.getPlato()).toContain(itemMenuMock1);
    });

    it("Debe buscar y retornar un plato o combo por su nombre exacto", () => {
        const menu = new Menu([itemMenuMock1, itemMenuMock2]);

        itemMenuMock1.getNombre.mockReturnValue("Milanesa con Fritas");
        itemMenuMock2.getNombre.mockReturnValue("Combo Familiar");

        const encontrado = menu.buscarPlatoPorNombre("Combo Familiar");

        expect(encontrado).toBe(itemMenuMock2);
    });

    it("Debe retornar undefined si el plato o combo buscado no existe en el menú", () => {
        const menu = new Menu([itemMenuMock1]);

        itemMenuMock1.getNombre.mockReturnValue("Milanesa con Fritas");

        const encontrado = menu.buscarPlatoPorNombre("Ñoquis Caseros");

        expect(encontrado).toBeUndefined();
    });

});