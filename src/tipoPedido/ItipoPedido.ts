/**
 * Contrato para modalidades de pedido y sus costos adicionales.
 */
export interface ITipoPedido {
    /**
     * Devuelve la descripción de la modalidad.
     * @returns Descripción de la modalidad.
     */
    getDescripcion(): string
    /**
     * Devuelve el cargo correspondiente a la modalidad.
     * @returns Costo adicional de la modalidad.
     */
    calcularCostoAdicional(): number
}