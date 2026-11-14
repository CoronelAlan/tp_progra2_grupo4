import{ describe, expect, it, beforeEach } from "@jest/globals";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { Pedido } from "../src/pedido/pedido";
import { Plato } from "../src/iplatomenu/plato";
import { ITipoPedido } from "../src/tipoPedido/ItipoPedido";
import { PlatoPedido } from "../src/platoPedido/platoPedido";
import { RegistroEstaciones } from "../src/tiposCocina/registroEstaciones";
import { Combo } from "../src/iplatomenu/combo";
import { PrecioFijoCombo } from "../src/iestrategiabeneficio/precioFijoCombo";
import { EstadoPendientePlato } from "../src/platoPedido/estadopendienteplato";

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

    tipoPedidoMock.calcularCostoAdicional.mockReturnValue(0);
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

    it("No debe derivar dos veces un pedido confirmado", () => {
    const pedido = new Pedido([platoPedidoMock], tipoPedidoMock);

    pedido.confirmarPedido(registroEstacionesMock);

    expect(() => {
        pedido.confirmarPedido(registroEstacionesMock);
    }).toThrow("El pedido ya se encuentra confirmado.");

    expect(registroEstacionesMock.derivarPlato).toHaveBeenCalledTimes(1);
    });

    it("Al confirmar el pedido, debe derivar todos sus platos a las estaciones de cocina", () => {
        const pedido = new Pedido([platoPedidoMock], tipoPedidoMock);

        pedido.confirmarPedido(registroEstacionesMock);

        // Verificamos que se haya llamado a derivarPlato en el registro por cada plato del pedido
        expect(registroEstacionesMock.derivarPlato).toHaveBeenCalledTimes(1);
        expect(registroEstacionesMock.derivarPlato).toHaveBeenCalledWith(platoPedidoMock);
    });


    it("Debe calcular el precio de los platos recibidos inicialmente", () => {
        const plato = new Plato("Milanesa", 5000, "Carnes");
        const platoInicial = new PlatoPedido(plato, new EstadoPendientePlato(), "");
        tipoPedidoMock.calcularCostoAdicional.mockReturnValue(500);

        const pedido = new Pedido([platoInicial], tipoPedidoMock);

        expect(pedido.calcularPrecioTotal()).toBe(5500);
    });

    it("Debe respetar el descuento de un combo al calcular el precio total", () => {
        const hamburguesa = new Plato("Hamburguesa", 5000, "Carnes");
        const papas = new Plato("Papas", 3000, "Cocina Fria");
        const combo = new Combo("Combo especial", [hamburguesa, papas], new PrecioFijoCombo(7000));

        const pedido = new Pedido([], tipoPedidoMock);
        pedido.agregarPlato(combo);

        expect(pedido.calcularPrecioTotal()).toBe(7000);
    });

    it("Debe quitar un plato del pedido y actualizar el precio", () => {
        const plato = new Plato("Hamburguesa", 5000, "Carnes");
        const pedido = new Pedido([], tipoPedidoMock);

        pedido.agregarPlato(plato);
        pedido.quitarPlato(plato);

        expect(pedido.calcularPrecioTotal()).toBe(0);
        expect(pedido.getPlatosCocina()).toHaveLength(0);
    });

    it("Debe quitar un plato que fue recibido inicialmente", () => {
        const plato = new Plato("Milanesa", 5000, "Carnes");
        const platoInicial = new PlatoPedido(plato, new EstadoPendientePlato(), "");
        const pedido = new Pedido([platoInicial], tipoPedidoMock);

        pedido.quitarPlato(plato);

        expect(pedido.calcularPrecioTotal()).toBe(0);
        expect(pedido.getPlatosCocina()).toHaveLength(0);
    });

    it("Debe quitar un combo completo sin eliminar otros platos", () => {
        const hamburguesa = new Plato("Hamburguesa", 5000, "Carnes");
        const papas = new Plato("Papas", 3000, "Cocina Fria");
        const bebida = new Plato("Gaseosa", 1000, "Bebidas");
        const combo = new Combo("Combo especial", [hamburguesa, papas], new PrecioFijoCombo(7000));

        const pedido = new Pedido([], tipoPedidoMock);
        pedido.agregarPlato(combo);
        pedido.agregarPlato(bebida);

        pedido.quitarPlato(combo);

        expect(pedido.calcularPrecioTotal()).toBe(1000);
        expect(pedido.getPlatosCocina()).toHaveLength(1);
    });

    it("Debe deshacer la eliminación de un combo y restaurar su precio", () => {
        const hamburguesa = new Plato("Hamburguesa", 5000, "Carnes");
        const papas = new Plato("Papas", 3000, "Cocina Fria");
        const combo = new Combo("Combo especial", [hamburguesa, papas], new PrecioFijoCombo(7000));

        const pedido = new Pedido([], tipoPedidoMock);
        pedido.agregarPlato(combo);
        pedido.quitarPlato(combo);

        pedido.deshacerUltimaModificacion();

        expect(pedido.calcularPrecioTotal()).toBe(7000);
        expect(pedido.getPlatosCocina()).toHaveLength(2);
    });

    it("Debe deshacer varias modificaciones en orden inverso", () => {
        const primero = new Plato("Hamburguesa", 5000, "Carnes");
        const segundo = new Plato("Papas", 3000, "Cocina Fria");

        const pedido = new Pedido([], tipoPedidoMock);
        pedido.agregarPlato(primero);
        pedido.agregarPlato(segundo);

        pedido.deshacerUltimaModificacion();
        expect(pedido.calcularPrecioTotal()).toBe(5000);

        pedido.deshacerUltimaModificacion();
        expect(pedido.calcularPrecioTotal()).toBe(0);
    });

    it("No debe fallar al deshacer cuando el historial está vacío", () => {
        const pedido = new Pedido([], tipoPedidoMock);

        expect(() => {
            pedido.deshacerUltimaModificacion();
        }).not.toThrow();
    });

    it("No debe permitir deshacer modificaciones de un pedido confirmado", () => {
        const plato = new Plato("Hamburguesa", 5000, "Carnes");
        const pedido = new Pedido([], tipoPedidoMock);

        pedido.agregarPlato(plato);
        pedido.confirmarPedido(registroEstacionesMock);

        expect(() => {
            pedido.deshacerUltimaModificacion();
        }).toThrow("No se puede deshacer un pedido confirmado.");

        expect(pedido.calcularPrecioTotal()).toBe(5000);
    });

    it("No debe permitir quitar platos de un pedido confirmado", () => {
        const plato = new Plato("Hamburguesa", 5000, "Carnes");
        const pedido = new Pedido([], tipoPedidoMock);

        pedido.agregarPlato(plato);
        pedido.confirmarPedido(registroEstacionesMock);

        expect(() => {
            pedido.quitarPlato(plato);
        }).toThrow("No se puede modificar un pedido confirmado.");

        expect(pedido.calcularPrecioTotal()).toBe(5000);
    });

    it("No debe derivar platos si falla la validación de las estaciones", () => {
        const plato = new Plato("Hamburguesa", 5000, "Carnes");
        const pedido = new Pedido([], tipoPedidoMock);

        pedido.agregarPlato(plato);

        registroEstacionesMock.validarPlatos.mockImplementation(() => {
            throw new Error("Ninguna estación puede procesar este tipo de plato.");
        });

        expect(() => {
            pedido.confirmarPedido(registroEstacionesMock);
        }).toThrow("Ninguna estación puede procesar este tipo de plato.");

        expect(registroEstacionesMock.derivarPlato).not.toHaveBeenCalled();
    });

    it("No debe permitir quitar un plato inexistente", () => {
        const plato = new Plato("Milanesa", 5000, "Carnes");
        const pedido = new Pedido([], tipoPedidoMock);

        expect(() => {
            pedido.quitarPlato(plato);
        }).toThrow("El plato que intenta remover no se encuentra en el pedido.");
    });

    it("No debe permitir quitar un combo inexistente", () => {
        const hamburguesa = new Plato("Hamburguesa", 5000, "Carnes");
        const papas = new Plato("Papas", 3000, "Cocina Fria");
        const combo = new Combo("Combo especial", [hamburguesa, papas], new PrecioFijoCombo(7000));

        const pedido = new Pedido([], tipoPedidoMock);

        expect(() => {
            pedido.quitarPlato(combo);
        }).toThrow("El combo que intenta remover no se encuentra en el pedido.");
    });

    it("No debe permitir quitar un plato que está en preparación", () => {
        const plato = new Plato("Hamburguesa", 5000, "Carnes");
        const pedido = new Pedido([], tipoPedidoMock);

        pedido.agregarPlato(plato);
        pedido.getPlatosCocina()[0].pasarAPreparacion();

        expect(() => {
            pedido.quitarPlato(plato);
        }).toThrow("No se puede remover un plato que ya se encuentra en preparación o listo.");

        expect(pedido.calcularPrecioTotal()).toBe(5000);
    });

    it("No debe eliminar parcialmente un combo si un plato está en preparación", () => {
        const hamburguesa = new Plato("Hamburguesa", 5000, "Carnes");
        const papas = new Plato("Papas", 3000, "Cocina Fria");
        const combo = new Combo("Combo especial", [hamburguesa, papas], new PrecioFijoCombo(7000));

        const pedido = new Pedido([], tipoPedidoMock);
        pedido.agregarPlato(combo);

        pedido.getPlatosCocina()[1].pasarAPreparacion();

        expect(() => {
            pedido.quitarPlato(combo);
        }).toThrow("No se puede remover un plato que ya se encuentra en preparación o listo.");

        expect(pedido.getPlatosCocina()).toHaveLength(2);
        expect(pedido.calcularPrecioTotal()).toBe(7000);
    });


});

