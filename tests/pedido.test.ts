import{ describe, expect, it, beforeEach } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { Pedido } from "../src/pedido/pedido";
import { Plato } from "../src/iplatomenu/plato";
import { ITipoPedido } from "../src/tipoPedido/ItipoPedido";
import { PlatoPedido } from "../src/platoPedido/platoPedido";
import { RegistroEstaciones } from "../src/tiposCocina/registroEstaciones";

describe("Test de la clase Pedido", () => {

    let tipoPedidoMock: DeepMockProxy<ITipoPedido>;
    let platoMock: DeepMockProxy<Plato>;
    let platoPedidoMock: DeepMockProxy<PlatoPedido>;
    let registroEstacionesMock: DeepMockProxy<RegistroEstaciones>;

    beforeEach(() => {
        tipoPedidoMock = mockDeep<ITipoPedido>();
        platoMock = mockDeep<Plato>();
        platoPedidoMock = mockDeep<PlatoPedido>();
        registroEstacionesMock = mockDeep<RegistroEstaciones>();
    });

    it("Debe crearse en construcción con sus platos y tipo de pedido iniciales", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        expect(pedido.getTipoPedido()).toBe(tipoPedidoMock);
        expect(pedido.getPlatosCocina()).toEqual([]);
    });

    it("Debe permitir agregar un plato al pedido en construcción", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        
        platoMock.obtenerPlatos.mockReturnValue([platoMock]);
        pedido.agregarPlato(platoMock);

        expect(pedido.getPlatosCocina().length).toBe(1);
    });

    it("Debe permitir deshacer la última modificación (Memento/Undo)", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        platoMock.obtenerPlatos.mockReturnValue([platoMock]);

        pedido.agregarPlato(platoMock);
        expect(pedido.getPlatosCocina().length).toBe(1);

        pedido.deshacerUltimaModificacion();
        expect(pedido.getPlatosCocina().length).toBe(0);
    });

    it("Debe calcular correctamente el precio total sumando platos y costo adicional", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        platoMock.obtenerPlatos.mockReturnValue([platoMock]);
        
        platoMock.calcularPrecio.mockReturnValue(4000);
        tipoPedidoMock.calcularCostoAdicional.mockReturnValue(500);

        pedido.agregarPlato(platoMock);

        expect(pedido.calcularPrecioTotal()).toBe(4500);
    });

    it("No debe permitir facturar si hay platos pendientes", () => {
        platoPedidoMock.estaListo.mockReturnValue(false);
        const pedido = new Pedido([platoPedidoMock], tipoPedidoMock);

        expect(pedido.estaListoParaFacturar()).toBe(false);
    });

    it("Debe permitir facturar si todos los platos están listos y el pedido está confirmado", () => {
        platoPedidoMock.estaListo.mockReturnValue(true);
        const pedido = new Pedido([platoPedidoMock], tipoPedidoMock);
        
        // Pasamos el mock del registro al confirmar
        pedido.confirmarPedido(registroEstacionesMock);

        expect(pedido.estaListoParaFacturar()).toBe(true);
    });

    it("Una vez confirmado el pedido, no debe permitir agregar nuevos platos", () => {
        const pedido = new Pedido([], tipoPedidoMock);
        pedido.confirmarPedido(registroEstacionesMock);

        expect(() => {
            pedido.agregarPlato(platoMock);
        }).toThrow();
    });

    it("Al confirmar el pedido, debe derivar todos sus platos a las estaciones de cocina", () => {
        const pedido = new Pedido([platoPedidoMock], tipoPedidoMock);

        pedido.confirmarPedido(registroEstacionesMock);

        // Verificamos que se haya llamado a derivarPlato en el registro por cada plato del pedido
        expect(registroEstacionesMock.derivarPlato).toHaveBeenCalledTimes(1);
        expect(registroEstacionesMock.derivarPlato).toHaveBeenCalledWith(platoPedidoMock);
    });

});