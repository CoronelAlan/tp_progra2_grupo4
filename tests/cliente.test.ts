import { describe, expect, it } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { Cliente } from "../src/cliente"; 
import { Pedido } from "../src/pedido/pedido";

describe("Test de la clase Cliente", () => {

    let pedidoMock: DeepMockProxy<Pedido> = mockDeep<Pedido>();

    it("Debe inicializarse correctamente y retornar el nombre completo junto a un array de pedidos vacío", () => {
        const cliente = new Cliente("Juan", "Pérez");

        expect(cliente.getNombreCompleto()).toBe("Juan Pérez");
        expect(cliente.getPedidos()).toEqual([]);
    });

    it("Debe asociar nuevos pedidos correctamente y exponerlos mediante getPedidos", () => {
        const cliente = new Cliente("María", "Gómez");

        cliente.asociarPedido(pedidoMock);

        const pedidos = cliente.getPedidos();
        expect(pedidos).toHaveLength(1);
        expect(pedidos).toContain(pedidoMock);
    });

    it("Debe retornar una copia del array de pedidos para preservar la inmutabilidad interna", () => {
        const cliente = new Cliente("Carlos", "López");

        cliente.asociarPedido(pedidoMock);

        const pedidos1 = cliente.getPedidos();
        const pedidos2 = cliente.getPedidos();

        expect(pedidos1).not.toBe(pedidos2); // Distinta referencia de objeto (copia)
        expect(pedidos1).toEqual(pedidos2);  // Mismo contenido lógico
    });

});